package com.a705.hellogifty.api.dto.trade_post;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class TradePostRequestDto implements Serializable {

    private Long gifticonId;

    private String title;

    private String content;

    private Integer price;

    private MultipartFile cropImg;

}
