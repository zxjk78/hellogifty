package com.a705.hellogifty.api.service;


import com.a705.hellogifty.advice.exception.*;
import com.a705.hellogifty.aop.LoginUser;
import com.a705.hellogifty.api.dto.token.TokenRequestDto;
import com.a705.hellogifty.api.dto.token.TokenResponseDto;
import com.a705.hellogifty.api.dto.user.LoginResponseDto;
import com.a705.hellogifty.api.dto.user.MmsIndexEditDto;
import com.a705.hellogifty.api.dto.user.UserLoginRequestDto;
import com.a705.hellogifty.api.dto.user.UserSignupRequestDto;
import com.a705.hellogifty.api.repository.RefreshTokenRepository;
import com.a705.hellogifty.api.repository.UserRepository;
import com.a705.hellogifty.api.domain.entity.RefreshToken;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.config.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class SignService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;


    @Transactional
    public LoginResponseDto login(UserLoginRequestDto userLoginRequestDto) {
        User user = userRepository.findByEmail(userLoginRequestDto.getEmail()).orElseThrow(EmailLoginFailedException::new);
        Long mmsIndex = user.getMmsIndex();
        if(!passwordEncoder.matches(userLoginRequestDto.getPassword(), user.getPassword()))
            throw new EmailLoginFailedException();

        TokenResponseDto tokenDto = jwtProvider.createTokenDto(user.getId(), user.getRoles());

        RefreshToken refreshToken = RefreshToken.builder()
                .tokenKey(user.getId())
                .token(tokenDto.getRefreshToken())
                .build();

        RefreshToken savedRefreshToken = refreshTokenRepository.findByTokenKey(user.getId()).orElse(null);
        if (savedRefreshToken == null)
            refreshTokenRepository.save(refreshToken);
        else {
            savedRefreshToken.updateToken(tokenDto.getRefreshToken());
        }

        LoginResponseDto loginResponseDto = new LoginResponseDto(tokenDto, mmsIndex, user);

        return loginResponseDto;
    }


    @Transactional
    public void signup(UserSignupRequestDto userSignupRequestDto) {
        if (userRepository.findByEmail(userSignupRequestDto.getEmail()).isPresent())
            throw new EmailSignupFailedException();
        User newUser = userRepository.save(userSignupRequestDto.toEntity(passwordEncoder));
    }

    @Transactional
    public void userMmsIndexEdit(User user, MmsIndexEditDto mmsIndexEditDto) {
        User loginUser = userRepository.findByEmail(user.getEmail()).get();
        loginUser.updateMmsIndex(mmsIndexEditDto);
    }

    @Transactional
    public TokenResponseDto reissue(TokenRequestDto tokenRequestDto, HttpServletResponse response) {
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        if (!jwtProvider.validationToken(tokenRequestDto.getRefreshToken())) {
            throw new RefreshTokenExpiredException();
        }

        String accessToken = tokenRequestDto.getAccessToken();
        Authentication authentication = jwtProvider.getAuthentication(accessToken);

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(UserNotFoundException::new);

        RefreshToken refreshToken = refreshTokenRepository.findByTokenKey(user.getId())
                .orElseThrow(RefreshTokenNotFoundException::new);

        if (!refreshToken.getToken().equals(tokenRequestDto.getRefreshToken())) {
            throw new RefreshTokenNotEqualException();
        }

        // AccessToken, RefreshToken 재발급, 저장
        TokenResponseDto newCreatedToken = jwtProvider.createTokenDto(user.getId(), user.getRoles());
        RefreshToken updateRefreshToken = refreshToken.updateToken(newCreatedToken.getRefreshToken());
        refreshTokenRepository.save(updateRefreshToken);

        return newCreatedToken;
    }

    @Transactional
    public void logout(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        refreshTokenRepository.deleteByTokenKey(user.getId());
    }

}
