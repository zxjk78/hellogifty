package com.a705.hellogifty.api.dto.user;

import com.a705.hellogifty.api.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponseDto {

    private Long id;
    private String name;

    public UserInfoResponseDto(User user) {
        this.id = user.getId();
        this.name = user.getName();
    }
}
