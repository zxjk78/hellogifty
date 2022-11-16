package com.a705.hellogifty.api.service;

import com.a705.hellogifty.advice.exception.GifticonNotFoundException;
import com.a705.hellogifty.advice.exception.SmallCategoryNotFoundException;
import com.a705.hellogifty.advice.exception.UserNotFoundException;
import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.entity.SmallCategory;
import com.a705.hellogifty.api.domain.entity.TradePost;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.domain.enums.TradeState;
import com.a705.hellogifty.api.dto.gifticon.*;
import com.a705.hellogifty.api.repository.GifticonRepository;
import com.a705.hellogifty.api.repository.SmallCategoryRepository;
import com.a705.hellogifty.api.repository.TradePostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GifticonService {

    private final GifticonRepository gifticonRepository;
    private final SmallCategoryRepository smallCategoryRepository;

    private final TradePostRepository tradePostRepository;

    @Value("${image.gifticon.path}")
    String gifticonImagePath;

    @Transactional
    public List<GifticonListResponseDto> myAllGifticon(User user) {

//        String defaultPath = System.getProperty("user.dir")+File.separator+"src"+File.separator+"main"+File.separator+"resources"+File.separator+"static"+File.separator+"img"+File.separator+"brandImg"+File.separator;
        List<GifticonListResponseDto> list = new ArrayList<>();

        for (Gifticon gifticon : gifticonRepository.findByUserIdWithSmallCategory(user.getId()).orElseThrow(GifticonNotFoundException::new)) {
            list.add(new GifticonListResponseDto(gifticon));
        }

        return list;
    }

    @Transactional
    public List<GifticonListResponseDto> myTradeGifticon(User user) {
        List<GifticonListResponseDto> list = new ArrayList<>();

        for (TradePost tradePost : tradePostRepository.findByUser(user).orElseThrow(UserNotFoundException::new)) {
            if ( tradePost.getTradeState().equals(TradeState.ONSALE) ) {
                Gifticon gifticon = gifticonRepository.findById(tradePost.getGifticon().getId()).orElseThrow(GifticonNotFoundException::new);
                list.add(new GifticonListResponseDto(gifticon));
            }
        }

        return list;
    }

    @Transactional
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
        String defaultPath = System.getProperty("user.dir")+gifticonImagePath;
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


}
