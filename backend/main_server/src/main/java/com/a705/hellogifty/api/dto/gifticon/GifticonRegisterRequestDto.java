package com.a705.hellogifty.api.dto.gifticon;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GifticonRegisterRequestDto {
    private String name;

    private Short categoryId;

    private String expirationDate;

}
