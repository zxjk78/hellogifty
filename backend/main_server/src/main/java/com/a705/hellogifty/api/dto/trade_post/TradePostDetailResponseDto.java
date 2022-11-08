package com.a705.hellogifty.api.dto.trade_post;

import com.a705.hellogifty.api.domain.entity.TradePost;
import com.a705.hellogifty.api.domain.enums.TradeState;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TradePostDetailResponseDto {

    private Long id;

    private Long gifticonId;

    private String title;

    private String content;

    private Integer price;

    private SellerInfoDto sellerInfo;

    private TradeState tradeState;

    private LocalDate createdAt;

    private LocalDate modifiedAt;

    private String img;

    public TradePostDetailResponseDto(TradePost tradePost, String defaultPath) {
        id = tradePost.getId();
        gifticonId = tradePost.getGifticon().getId();
        title = tradePost.getTitle();
        content = tradePost.getContent();
        price = tradePost.getPrice();
        sellerInfo = new SellerInfoDto(tradePost.getUser());
//        tradeState = tradePost.getTradeState();
        createdAt = tradePost.getCreatedAt();
        modifiedAt = tradePost.getModifiedAt();
        img = defaultPath + tradePost.getImg();
    }
}
