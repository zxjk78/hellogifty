package com.a705.hellogifty.api.dto.user;

import com.a705.hellogifty.api.domain.entity.TradeHistory;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.trade_post.UserInfoTradePostResponseDto;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class MyInfoResponseDto {

    private Long id;
    private String name;

    private Float evalScore;

    private List<UserInfoTradePostResponseDto> salesRecord;
    private List<UserInfoTradePostResponseDto> purchaseRecord;

    public MyInfoResponseDto(User user, List<TradeHistory> salesRecord, List<TradeHistory> purchaseRecord){
        this.id = user.getId();
        this.name = user.getName();
        this.evalScore = user.getUserEvaluation().getTotalScore();
        this.salesRecord = salesRecord.stream().map(th->new UserInfoTradePostResponseDto(th.getTradePost())).collect(Collectors.toList());
        this.purchaseRecord = purchaseRecord.stream().map(th->new UserInfoTradePostResponseDto(th.getTradePost())).collect(Collectors.toList());
    }


}
