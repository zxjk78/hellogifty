package com.a705.hellogifty.api.domain.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
public class Gifticon extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private SmallCategory smallCategory;

    @Column(length = 100)
    private String name;

    @Column(length = 20)
    private String number;

    private LocalDate expirationDate;

    private Boolean isUsed;

    @Column(length = 300)
    private String img;
}
