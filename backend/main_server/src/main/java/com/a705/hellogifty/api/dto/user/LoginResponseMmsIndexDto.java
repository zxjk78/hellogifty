package com.a705.hellogifty.api.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseMmsIndexDto {
    private String accessToken;
    private Date accessTokenExpireDate;
    private String refreshToken;
    private Long userMmsIndex;
    private Long userId;
}
