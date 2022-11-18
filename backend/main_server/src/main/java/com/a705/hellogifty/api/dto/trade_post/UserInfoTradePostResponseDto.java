package com.a705.hellogifty.api.dto.trade_post;

import com.a705.hellogifty.api.domain.entity.TradePost;
import com.a705.hellogifty.api.dto.gifticon.UserInfoGifticonResponseDto;
import lombok.Getter;

@Getter
public class UserInfoTradePostResponseDto {

    private Long tradePostId;
    private String title;
    private String sellerName;
    private String image;
    private Integer price;
    private UserInfoGifticonResponseDto gifticonInfo;

    public UserInfoTradePostResponseDto(TradePost tradePost) {
        this.tradePostId = tradePost.getId();
        this.title = tradePost.getTitle();
        this.sellerName = tradePost.getUser().getName();
        this.image = tradePost.getImg();
        this.price = tradePost.getPrice();
        this.gifticonInfo = new UserInfoGifticonResponseDto(tradePost.getGifticon());
    }
}
