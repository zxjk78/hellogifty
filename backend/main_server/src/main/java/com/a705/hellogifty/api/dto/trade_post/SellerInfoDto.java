package com.a705.hellogifty.api.dto.trade_post;

import com.a705.hellogifty.api.domain.entity.User;
import lombok.Getter;

@Getter
public class SellerInfoDto {
    private Long id;

    private String email;

    private Float userScore;

    public SellerInfoDto(User user) {
        id = user.getId();
        email = user.getEmail();
        userScore = user.getUserEvaluation().getTotalScore();
    }

}
