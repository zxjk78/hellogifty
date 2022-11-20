package com.a705.hellogifty.api.dto.user;

import com.a705.hellogifty.api.domain.entity.TradeHistory;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.trade_post.UserInfoTradePostResponseDto;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class UserProfileResponseDto {

    private Long id;
    private String name;
    private Float evalScore;
    private List<UserInfoTradePostResponseDto> salesRecord;

    public UserProfileResponseDto(User userWithScore,List<TradeHistory> salesRecord) {
        this.id = userWithScore.getId();
        this.name = userWithScore.getName();
        this.evalScore = userWithScore.getUserEvaluation().getTotalScore();
        this.salesRecord = salesRecord.stream().map(th->new UserInfoTradePostResponseDto(th.getTradePost())).collect(Collectors.toList());
    }
}
