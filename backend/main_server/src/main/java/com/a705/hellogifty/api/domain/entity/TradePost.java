package com.a705.hellogifty.api.domain.entity;

import com.a705.hellogifty.api.domain.enums.TradeState;
import com.a705.hellogifty.api.dto.trade_post.TradePostEditRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TradePost extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gifticon_id")
    private Gifticon gifticon;

    @Column(length = 50)
    private String title;

    @Column(length = 100)
    private String content;

    private Integer price;

    @Enumerated(EnumType.STRING)
    private TradeState tradeState = TradeState.ONSALE;

    @Column(length = 300)
    private String img;


    public void update(TradePostEditRequestDto tradePostEditRequestDto) {
        this.title = tradePostEditRequestDto.getTitle();
        this.content = tradePostEditRequestDto.getContent();
        this.price = tradePostEditRequestDto.getPrice();
//        this.tradeState = tradePostEditRequestDto.getTradeState();
    }

    public void changeStateTosoldOut() {
        this.tradeState = TradeState.SOLDOUT;
    }

    public void changeStateToExpired() {
        this.tradeState = TradeState.EXPIRED;
    }
}
