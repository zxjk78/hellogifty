package com.a705.hellogifty.api.service;

import com.a705.hellogifty.advice.exception.GifticonNotFoundException;
import com.a705.hellogifty.advice.exception.SmallCategoryNotFoundException;
import com.a705.hellogifty.advice.exception.UserNotFoundException;
import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.entity.SmallCategory;
import com.a705.hellogifty.api.domain.entity.TradePost;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.domain.enums.TradeState;
import com.a705.hellogifty.api.dto.gifticon.InfoExtractedGifticonResponseDto;
import com.a705.hellogifty.api.dto.gifticon.*;
import com.a705.hellogifty.api.repository.GifticonRepository;
import com.a705.hellogifty.api.repository.SmallCategoryRepository;
import com.a705.hellogifty.api.repository.TradePostRepository;
import lombok.RequiredArgsConstructor;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jackson.JsonObjectSerializer;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GifticonService {

    private final GifticonRepository gifticonRepository;
    private final SmallCategoryRepository smallCategoryRepository;
    private final TradePostRepository tradePostRepository;

    @Value("${image.gifticon.path}")
    String gifticonImagePath;

    @Value("${url.server.image}")
    private String IMAGE_SERVER_URL;


    public List<GifticonListResponseDto> myAllGifticon(User user) {

//        String defaultPath = System.getProperty("user.dir")+File.separator+"src"+File.separator+"main"+File.separator+"resources"+File.separator+"static"+File.separator+"img"+File.separator+"brandImg"+File.separator;
        return gifticonRepository.findByUserIdWithTradePostAndSmallCategory(user.getId()).get().stream()
                .map(GifticonListResponseDto::new).collect(Collectors.toList());
    }

    public List<GifticonListResponseDto> myTradeGifticon(User user) {
        List<GifticonListResponseDto> list = new ArrayList<>();

        for (TradePost tradePost : tradePostRepository.findByUser(user).orElseThrow(UserNotFoundException::new)) {
            if ( tradePost.getTradeState().equals(TradeState.ONSALE) ) {
                Gifticon gifticon = gifticonRepository.findById(tradePost.getGifticon().getId()).orElseThrow(GifticonNotFoundException::new);
                list.add(new GifticonListResponseDto(gifticon));
            }
        }
        return  list;
    }

    public GifticonDetailResponseDto myGifticonDetail(User user, Long gifticonId) {
//        String defaultPath = System.getProperty("user.dir")+File.separator+"src"+File.separator+"main"+File.separator+"resources"+File.separator+"static"+File.separator+"img"+File.separator+"gifticon"+File.separator;
        Gifticon gifticon = gifticonRepository.findByUserAndId(user, gifticonId).orElseThrow(GifticonNotFoundException::new);
        return new GifticonDetailResponseDto(gifticon);
    }

    @Transactional
    public void myGifticonEdit(User user, Long gifticonId, GifticonEditRequestDto gifticonEditRequestDto) {
        Gifticon gifticon = gifticonRepository.findByUserAndId(user, gifticonId).orElseThrow(GifticonNotFoundException::new);
        SmallCategory smallCategory = smallCategoryRepository.findById(gifticonEditRequestDto.getSmallCategoryId()).orElseThrow(SmallCategoryNotFoundException::new);
        GifticonEditDto gifticonEditDto = new GifticonEditDto(gifticonEditRequestDto, smallCategory);
        gifticon.update(gifticonEditDto);
    }

    @Transactional
    public void changeGifticonState(User user, Long gifticonId) {
        Gifticon gifticon = gifticonRepository.findByUserAndId(user, gifticonId).orElseThrow(GifticonNotFoundException::new);
        gifticon.changeIsUsed();
    }

    @Transactional
    public void myGifticonDelete(User user, Long gifticonId) {
        gifticonRepository.deleteByUserAndId(user, gifticonId);
    }

    @Transactional
    public void myGifticonRegister(User user, GifticonRegisterRequestDto gifticonRegisterRequestDto) throws IOException {
        String fileUploadNow = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
        String rawBase = gifticonRegisterRequestDto.getFileBase64();
        String[] basesplit = rawBase.split(",", 2);
        String extension = basesplit[0].split(";", 2)[0].split("/", 2)[1];
        String base = basesplit[1];
//        String extension = "png";
//        data:image/jpeg;base64,
//        String defaultPath = System.getProperty("user.dir")+File.separator+"src"+File.separator+"main"+File.separator+"resources"+File.separator+"static"+File.separator+"img"+File.separator+"gifticon"+File.separator;
        String defaultPath = gifticonImagePath+File.separator;
        File img = new File(defaultPath+user.getEmail()+"_"+fileUploadNow+"."+extension);

        Base64.Decoder decoder = Base64.getDecoder();
        byte[] decodedBytes = decoder.decode(base.getBytes());
        FileOutputStream fileOutputStream = new FileOutputStream(img);
        fileOutputStream.write(decodedBytes);
        fileOutputStream.close();

        Gifticon gifticon = Gifticon.builder().user(user)
                .smallCategory(smallCategoryRepository.findById(gifticonRegisterRequestDto.getCategoryId()).orElseThrow(SmallCategoryNotFoundException::new))
                .name(gifticonRegisterRequestDto.getName())
                .number(gifticonRegisterRequestDto.getNumber())
                .expirationDate(LocalDate.parse(gifticonRegisterRequestDto.getExpirationDate(), DateTimeFormatter.ISO_DATE))
                .isUsed(false)
//                .tradeState(TradeState.NOTONSALE)
                .img(img.getName()).build();

        gifticonRepository.save(gifticon);
    }



    public List<InfoExtractedGifticonResponseDto> validateGifticons(List<String> base64StringList) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String,Object> bodyMap = new HashMap<>();
//        bodyMap.put("images",base64StringList);
        bodyMap.put("images", base64StringList );
        List<InfoExtractedGifticonResponseDto> response = restTemplate.postForObject(IMAGE_SERVER_URL + "/validate-gifticon/", bodyMap, List.class);
//        System.out.println(restTemplate.postForObject(IMAGE_SERVER_URL + "/validate-gifticon/", bodyMap, String.class));
        return response;
    }
}
