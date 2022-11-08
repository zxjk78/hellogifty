package com.a705.hellogifty.api.dto.gifticon;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.enums.TradeState;
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

//    private boolean isOnTrade;

    private String img;

    public GifticonDetailResponseDto(Gifticon gifticon, String defaultPath) {
        id = gifticon.getId();
        categoryId = gifticon.getSmallCategory().getLargeCategory().getId();
        name = gifticon.getName();
        number = gifticon.getNumber();
        expirationDate = gifticon.getExpirationDate().toString();
        isUsed = gifticon.getIsUsed();
//        isOnTrade = ;
        img = defaultPath + gifticon.getImg();
    }

}
