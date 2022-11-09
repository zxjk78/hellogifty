package com.a705.hellogifty.api.dto.user;

import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.token.TokenResponseDto;
import lombok.Getter;

import java.util.Date;

@Getter
public class LoginResponseDto {

    private String grantType;

    private String accessToken;

    private String refreshToken;

    private Date accessTokenExpireDate;

    private Long userMmsIndex;

    private String userEmail;

    public LoginResponseDto(TokenResponseDto tokenResponseDto, Long mmsIndex, User user) {
        grantType = tokenResponseDto.getGrantType();
        accessToken = tokenResponseDto.getAccessToken();
        refreshToken = tokenResponseDto.getRefreshToken();
        accessTokenExpireDate = tokenResponseDto.getAccessTokenExpireDate();
        userMmsIndex = mmsIndex;
        userEmail = user.getEmail();
    }

}
