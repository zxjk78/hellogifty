package com.a705.hellogifty.api.dto.gifticon;

import com.a705.hellogifty.api.domain.entity.SmallCategory;
import lombok.Getter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
public class GifticonEditDto {

    private String name;

//    private String number;

    private LocalDate expirationDate;

    private SmallCategory smallCategory;

    public GifticonEditDto(GifticonEditRequestDto gifticonEditRequestDto, SmallCategory category) {
        name = gifticonEditRequestDto.getName();
//        number = gifticonEditRequestDto.getNumber();
        expirationDate = LocalDate.parse(gifticonEditRequestDto.getExpirationDateString(), DateTimeFormatter.ISO_DATE);
        smallCategory = category;
    }
}
