package com.a705.hellogifty.api.dto.trade_post;

import com.a705.hellogifty.api.domain.entity.User;
import lombok.Getter;

@Getter
public class SellerInfoDto {
    private Long id;

    private String email;

    public SellerInfoDto(User user) {

    }

}
