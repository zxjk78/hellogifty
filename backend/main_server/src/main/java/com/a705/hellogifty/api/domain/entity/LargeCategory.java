package com.a705.hellogifty.api.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class LargeCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;

    @Column(length = 40)
    private String name;
}
