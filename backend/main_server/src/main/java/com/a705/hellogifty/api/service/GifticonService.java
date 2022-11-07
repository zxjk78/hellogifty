package com.a705.hellogifty.api.service;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.entity.SmallCategory;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.domain.enums.TradeState;
import com.a705.hellogifty.api.dto.gifticon.*;
import com.a705.hellogifty.api.repository.GifticonRepository;
import com.a705.hellogifty.api.repository.SmallCategoryRepository;
import lombok.RequiredArgsConstructor;
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

    @Transactional
    public List<GifticonListResponseDto> myAllGifticon(User user) {

        String defaultPath = System.getProperty("user.dir")+File.separator+"static"+File.separator+"img"+File.separator+"brandImg"+File.separator;
        List<GifticonListResponseDto> list = new ArrayList<>();

        for (Gifticon gifticon : gifticonRepository.findByUserId(user.getId()).get()) {
            list.add(new GifticonListResponseDto(gifticon, defaultPath));
        }

        return list;
    }

    @Transactional
    public GifticonDetailResponseDto myGifticonDetail(User user, Long gifticonId) {
        String defaultPath = System.getProperty("user.dir")+File.separator+"static"+File.separator+"img"+File.separator+"gifticon"+File.separator;
        Gifticon gifticon = gifticonRepository.findById(gifticonId).get();
        return new GifticonDetailResponseDto(gifticon, defaultPath);
    }

    @Transactional
    public void myGifticonEdit(User user, Long gifticonId, GifticonEditRequestDto gifticonEditRequestDto) {
        Gifticon gifticon = gifticonRepository.findById(gifticonId).get();
        SmallCategory smallCategory = smallCategoryRepository.findById(gifticonEditRequestDto.getSmallCategoryId()).get();
        GifticonEditDto gifticonEditDto = new GifticonEditDto(gifticonEditRequestDto, smallCategory);
        gifticon.update(gifticonEditDto);
    }

    @Transactional
    public void myGifticonDelete(User user, Long gifticonId) {
        gifticonRepository.deleteById(gifticonId);
    }

    @Transactional
    public void myGifticonRegister(User user, GifticonRegisterRequestDto gifticonRegisterRequestDto) throws IOException {
        String fileUploadNow = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
        String base = gifticonRegisterRequestDto.getFileBase64();
        String extension = "png";
        String defaultPath = System.getProperty("user.dir")+File.separator+"static"+File.separator+"img"+File.separator+"gifticon"+File.separator;
        File img = new File(defaultPath+user.getEmail()+"_"+fileUploadNow+"."+extension);

        Base64.Decoder decoder = Base64.getDecoder();
        byte[] decodedBytes = decoder.decode(base.getBytes());
        FileOutputStream fileOutputStream = new FileOutputStream(img);
        fileOutputStream.write(decodedBytes);
        fileOutputStream.close();

        Gifticon gifticon = Gifticon.builder().user(user)
                .smallCategory(smallCategoryRepository.findById(gifticonRegisterRequestDto.getCategoryId()).get())
                .name(gifticonRegisterRequestDto.getName())
                .number("나중에연결")
                .expirationDate(LocalDate.parse(gifticonRegisterRequestDto.getExpirationDate(), DateTimeFormatter.ISO_DATE))
                .isUsed(false)
//                .tradeState(TradeState.NOTONSALE)
                .img(img.getName()).build();

        gifticonRepository.save(gifticon);
    }


}