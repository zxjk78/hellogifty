package com.a705.hellogifty.api.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Evaluation extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tradehistory_id")
    private TradeHistory tradeHistory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evaluator_id")
    private User evaluator;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evaluatee_id")
    private User evaluatee;

    private Float score;
}
