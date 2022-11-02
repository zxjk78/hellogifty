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
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GifticonService {

    private final GifticonRepository gifticonRepository;
    private final SmallCategoryRepository smallCategoryRepository;

    @Transactional
    public List<GifticonListResponseDto> myAllGifticon(User user) {


        List<GifticonListResponseDto> list = new ArrayList<>();

        for (Gifticon gifticon : gifticonRepository.findByUserId(user.getId()).get()) {
            list.add(new GifticonListResponseDto(gifticon));
        }
        System.out.println(list);
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
    public void myGifticonRegister(User user, Short categoryId, String name, String expirationDate, String imgPath) {


        Gifticon gifticon = Gifticon.builder().user(user)
                .smallCategory(null)
                .name(name)
                .number("나중에연결")
                .expirationDate(LocalDate.parse(expirationDate, DateTimeFormatter.ISO_DATE))
                .isUsed(false)
                .img(imgPath).build();

        gifticonRepository.save(gifticon);
    }


}
