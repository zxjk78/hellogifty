package com.a705.hellogifty.api.domain.entity;

import com.a705.hellogifty.api.domain.enums.TradeState;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
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
    private TradeState tradeState;

    @Column(length = 300)
    private String img;
}
