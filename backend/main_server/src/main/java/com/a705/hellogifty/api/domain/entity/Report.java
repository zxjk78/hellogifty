package com.a705.hellogifty.api.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Report extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tradepost_id")
    private TradePost tradePost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id")
    private User reporter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reportee_id")
    private User reportee;

    @Column(length = 200)
    private String content;

}
