package com.a705.hellogifty.api.dto.gifticon;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class InfoExtractedGifticonResponseDto {
    private Integer idx;
    private String name;
    private String number;
    private String expirationDate;
}
