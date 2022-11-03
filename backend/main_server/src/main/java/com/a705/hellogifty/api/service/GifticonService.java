package com.a705.hellogifty.api.service;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.gifticon.GifticonDetailResponseDto;
import com.a705.hellogifty.api.dto.gifticon.GifticonEditRequestDto;
import com.a705.hellogifty.api.dto.gifticon.GifticonListResponseDto;
import com.a705.hellogifty.api.dto.gifticon.GifticonRegisterRequestDto;
import com.a705.hellogifty.api.repository.GifticonRepository;
import com.a705.hellogifty.api.repository.SmallCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

        Gifticon gifticon = gifticonRepository.findById(gifticonId).get();
        return new GifticonDetailResponseDto(gifticon);
    }

    @Transactional
    public void myGifticonEdit(User user, Long gifticonId, GifticonEditRequestDto gifticonEditRequestDto) {
        Gifticon gifticon = gifticonRepository.findById(gifticonId).get();
        gifticon.update(gifticonEditRequestDto);
    }

    @Transactional
    public void myGifticonDelete(User user, Long gifticonId) {
        gifticonRepository.deleteById(gifticonId);
    }

    @Transactional
    public void myGifticonRegister(User user, GifticonRegisterRequestDto gifticonRegisterRequestDto, File img) {


        Gifticon gifticon = Gifticon.builder().user(user)
                .smallCategory(smallCategoryRepository.findById(gifticonRegisterRequestDto.getCategoryId()).get())
                .name(gifticonRegisterRequestDto.getName())
                .number("나중에연결")
                .expirationDate(LocalDate.parse(gifticonRegisterRequestDto.getExpirationDate(), DateTimeFormatter.ISO_DATE))
                .isUsed(false)
                .img(img.getPath()).build();

        gifticonRepository.save(gifticon);
    }


}
