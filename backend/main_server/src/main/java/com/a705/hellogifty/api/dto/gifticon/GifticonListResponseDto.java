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
public class GifticonListResponseDto {

    private Long id;

    private Short categoryId;

    private String name;

    private String expirationDate;

    private Boolean isUsed;

//    private boolean isOnTrade;

    private String brandName;

    private String brandImgPath;

    public GifticonListResponseDto(Gifticon gifticon) {
        id = gifticon.getId();
        categoryId = gifticon.getSmallCategory().getLargeCategory().getId();
        name = gifticon.getName();
        expirationDate = gifticon.getExpirationDate().toString();
        isUsed = gifticon.getIsUsed();
//        isOnTrade = ;
        brandName = gifticon.getSmallCategory().getName();
        brandImgPath = gifticon.getSmallCategory().getBrandImgName();

    }
}
