package com.a705.hellogifty.api.dto.user;

import com.a705.hellogifty.api.domain.entity.User;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

@Getter
public class UserSignupRequestDto {
    private String email;
    private String password;

    @Builder
    public UserSignupRequestDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User toEntity(PasswordEncoder passwordEncoder) {
        return User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .roles(Collections.singletonList("ROLE_USER")) // security에서 검증할떄 USER
                .build();
    }
}
