package com.a705.hellogifty.api.dto.gifticon;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.entity.TradePost;
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

    private boolean isOnTrade;

    private String brandName;

    private String brandImgPath;

    public GifticonListResponseDto(Gifticon gifticon) {
        this.id = gifticon.getId();
        this.categoryId = gifticon.getSmallCategory().getLargeCategory().getId();
        this.name = gifticon.getName();
        this.expirationDate = gifticon.getExpirationDate().toString();
        this.isUsed = gifticon.getIsUsed();
        boolean onTradeFlag = false;
        for(TradePost tp : gifticon.getTradePostList()) {
            if(TradeState.ONSALE.equals(tp.getTradeState())) {
                onTradeFlag=true;
                break;
            }
        }
        this.isOnTrade = onTradeFlag;
        this.brandName = gifticon.getSmallCategory().getName();
        this.brandImgPath = gifticon.getSmallCategory().getBrandImgName();

    }
}
