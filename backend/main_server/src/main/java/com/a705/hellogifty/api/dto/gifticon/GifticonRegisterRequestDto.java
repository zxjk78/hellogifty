package com.a705.hellogifty.api.dto.gifticon;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class GifticonRegisterRequestDto implements Serializable {

    private Short categoryId;

    private String name;

    private String number;

    private String expirationDate;

    private MultipartFile img;
}
