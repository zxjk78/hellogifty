package com.a705.hellogifty.api.dto.trade_post;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class TradePostRequestDto {

    private Long gifticonId;

    private String title;

    private String content;

    private Integer price;

    private MultipartFile cropImg;

}
