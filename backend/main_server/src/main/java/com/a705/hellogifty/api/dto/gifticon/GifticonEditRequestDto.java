package com.a705.hellogifty.api.dto.gifticon;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.entity.SmallCategory;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
public class GifticonEditRequestDto {

    private String name;

    private String number;

    private String expirationDateString;

    private Short smallCategoryId;

}
