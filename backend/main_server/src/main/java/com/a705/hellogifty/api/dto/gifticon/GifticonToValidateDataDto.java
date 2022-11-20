package com.a705.hellogifty.api.dto.gifticon;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class GifticonToValidateDataDto implements Serializable {
//    private List<String> base64StringList;
    private List<MultipartFile> imgList;
//    private List<String> imgList;
}
