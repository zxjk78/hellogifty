package com.a705.hellogifty.api.dto.gifticon;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MyInfoGifticonResponseDto {

    private Long gifticonId;
    private String brandName;
    private String brandImage;
    private LocalDate expirationDate;

    public MyInfoGifticonResponseDto(Gifticon gifticon) {
        this.gifticonId=gifticon.getId();
        this.brandName=gifticon.getSmallCategory().getName();
        this.brandImage=gifticon.getImg();
        this.expirationDate=gifticon.getExpirationDate();
    }
}
