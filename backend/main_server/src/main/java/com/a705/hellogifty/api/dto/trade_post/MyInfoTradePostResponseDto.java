package com.a705.hellogifty.api.dto.trade_post;

import com.a705.hellogifty.api.domain.entity.TradePost;
import com.a705.hellogifty.api.dto.gifticon.MyInfoGifticonResponseDto;
import lombok.Getter;

@Getter
public class MyInfoTradePostResponseDto {

    private Long tradePostId;
    private String title;
    private String sellerName;
    private String image;
    private Integer price;
    private MyInfoGifticonResponseDto gifticonInfo;

    public MyInfoTradePostResponseDto(TradePost tradePost) {
        this.tradePostId = tradePost.getId();
        this.title = tradePost.getTitle();
        this.sellerName = tradePost.getUser().getName();
        this.image = tradePost.getImg();
        this.price = tradePost.getPrice();
        this.gifticonInfo = new MyInfoGifticonResponseDto(tradePost.getGifticon());
    }
}
