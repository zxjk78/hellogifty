package com.a705.hellogifty.api.dto.trade_post;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.entity.TradePost;
import com.a705.hellogifty.api.domain.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TradePostListResponseDto {

    private Long id;

    private String userName;

    private Float userScore;

    private String gifticonName;

    private String expirationDate;

    private String title;

    private String content;

    private Integer price;

    private String cropImg;

    private String brandImg;

    private String brandName;


    public TradePostListResponseDto(TradePost tradePost) {
        id = tradePost.getId();
        userName = tradePost.getUser().getName();
        userScore = tradePost.getUser().getUserEvaluation().getTotalScore();
        gifticonName = tradePost.getGifticon().getName();
        expirationDate = tradePost.getGifticon().getExpirationDate().toString();
        title = tradePost.getTitle();
        content = tradePost.getContent();
        price = tradePost.getPrice();
        cropImg = tradePost.getImg();
        brandImg = tradePost.getGifticon().getSmallCategory().getBrandImgName();
        brandName = tradePost.getGifticon().getSmallCategory().getName();

    }
}
