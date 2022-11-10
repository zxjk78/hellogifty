package com.a705.hellogifty.api.dto.user;

import com.a705.hellogifty.api.domain.entity.TradeHistory;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.gifticon.MyInfoGifticonResponseDto;
import com.a705.hellogifty.api.dto.trade_post.MyInfoTradePostResponseDto;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class MyInfoResponseDto {

    private Long id;
    private String name;
    private List<MyInfoTradePostResponseDto> salesRecord;
    private List<MyInfoTradePostResponseDto> purchaseRecord;

    public MyInfoResponseDto(User user, List<TradeHistory> salesRecord, List<TradeHistory> purchaseRecord){
        this.id = user.getId();
        this.name = user.getName();
        this.salesRecord = salesRecord.stream().map(th->new MyInfoTradePostResponseDto(th.getTradePost())).collect(Collectors.toList());
        this.purchaseRecord = purchaseRecord.stream().map(th->new MyInfoTradePostResponseDto(th.getTradePost())).collect(Collectors.toList());
    }


}
