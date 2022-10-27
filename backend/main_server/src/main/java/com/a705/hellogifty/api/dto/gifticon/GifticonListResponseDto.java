package com.a705.hellogifty.api.dto.gifticon;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GifticonListResponseDto {

    private Long id;

    private Short categoryId;

    private String name;

    private String expirationDate;

    private Boolean isUsed;

    private Boolean isOnTrade;

    private String brandName;

    private String img;

    public GifticonListResponseDto(Gifticon gifticon) {
        id = gifticon.getId();
        categoryId = gifticon.getSmallCategory().getId();
        name = gifticon.getName();
        expirationDate = gifticon.getExpirationDate().toString();
        isUsed = gifticon.getIsUsed();
        isOnTrade = gifticon.getIsOnTrade();
        brandName = gifticon.getSmallCategory().getName();
        img = gifticon.getImg();

    }
}
