package com.a705.hellogifty.api.domain.entity;

import com.a705.hellogifty.api.dto.gifticon.GifticonEditRequestDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    public void update(GifticonEditRequestDto gifticonEditRequestDto) {
        this.name = gifticonEditRequestDto.getName();
        this.number = gifticonEditRequestDto.getNumber();
        this.expirationDate = gifticonEditRequestDto.getExpirationDate();
        this.smallCategory = gifticonEditRequestDto.getSmallCategory();
    }
}
