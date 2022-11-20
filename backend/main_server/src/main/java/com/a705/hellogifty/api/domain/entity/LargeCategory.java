package com.a705.hellogifty.api.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class LargeCategory {

    @Id
    private Short id;

    @Column(length = 40)
    private String name;
}
