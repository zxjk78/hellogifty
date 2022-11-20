package com.a705.hellogifty.config.security;


import com.a705.hellogifty.advice.ErrorCode;
import com.a705.hellogifty.advice.exception.AuthenticationEntryPointException;
import com.a705.hellogifty.api.dto.token.TokenResponseDto;
import com.a705.hellogifty.api.service.WebUserDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.Base64UrlCodec;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secretKey;
    private final Long accessTokenValidMillisecond = 60 * 60 * 1000L;            //  1 hour
    private final Long refreshTokenValidMillisecond = 14 * 24 * 60 * 60 * 1000L; // 2 weeks
    private final WebUserDetailsService userDetailsService;

    @PostConstruct
    protected void init() { // 의존성 주입 이후, secret key를 Base64 인코딩
        secretKey = Base64UrlCodec.BASE64URL.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public TokenResponseDto createTokenDto(Long userPk, List<String> roles) {
        Date now = new Date();
        String accessToken = Jwts.builder()
                    .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                    .setSubject(String.valueOf(userPk))
                    .setIssuedAt(now)
                    .setExpiration(new Date(now.getTime() + accessTokenValidMillisecond))
                    .claim("roles", roles)
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        String refreshToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setExpiration(new Date(now.getTime() + refreshTokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        Date date = new Date(now.getTime() + accessTokenValidMillisecond);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return TokenResponseDto.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accessTokenExpireDate(new Date(now.getTime() + accessTokenValidMillisecond))
                .build();
    }

    public Authentication getAuthentication (String token) {
        Claims claims = parseClaims(token);
        if (claims.get("roles") == null) {
            throw new AuthenticationEntryPointException();
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(claims.getSubject());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public Claims parseClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    public boolean validationToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            return true; }
        catch (ExpiredJwtException e) {
            return false;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    public boolean checkExpiredToken(String token, ServletRequest request) {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            request.setAttribute("exception", ErrorCode.AccessTokenExpiredException.getCode());
            //throw new AccessTokenExpiredException();
            return false;
        } catch (JwtException | IllegalArgumentException e) {
            request.setAttribute("exception", ErrorCode.AccessDenied.getCode());
            //throw new AccessDeniedException();
            return false;
        }
    }
}
