package com.a705.hellogifty.advice.dto.gifticon;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GifticonDetailResponseDto {

    private Long id;

    private Short categoryId;

    private String name;

    private String number;

    private String expirationDate;

    private Boolean isUsed;

    private Boolean isOnTrade;

    private String img;

    public GifticonDetailResponseDto(Gifticon gifticon) {
        id = gifticon.getId();
//        categoryId = gifticon.getSmallCategory().getId();
        name = gifticon.getName();
        number = gifticon.getNumber();
        expirationDate = gifticon.getExpirationDate().toString();
        isUsed = gifticon.getIsUsed();
//        isOnTrade = gifticon.getIsOnTrade();
        img = gifticon.getImg();
    }

}
