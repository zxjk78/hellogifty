package com.a705.hellogifty.api.dto.trade_post;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.enums.TradeState;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TradePostEditRequestDto {

    private String title;

    private String content;

    private Integer price;

    private TradeState tradeState;

}
