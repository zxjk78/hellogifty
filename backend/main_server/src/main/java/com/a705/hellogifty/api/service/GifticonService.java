package com.a705.hellogifty.api.service;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.gifticon.GifticonDetailResponseDto;
import com.a705.hellogifty.api.dto.gifticon.GifticonEditRequestDto;
import com.a705.hellogifty.api.dto.gifticon.GifticonListResponseDto;
import com.a705.hellogifty.api.repository.GifticonRepository;
import com.a705.hellogifty.api.repository.RefreshTokenRepository;
import com.a705.hellogifty.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GifticonService {

    private final GifticonRepository gifticonRepository;
    private final UserRepository userRepository;

    private final RefreshTokenRepository refreshTokenRepository;

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
    public void myGifticonDelete(User uesr, Long gifticonId) {
        gifticonRepository.deleteById(gifticonId);
    }
}
