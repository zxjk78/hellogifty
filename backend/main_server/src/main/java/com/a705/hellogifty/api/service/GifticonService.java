package com.a705.hellogifty.api.service;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.gifticon.GifticonListResponseDto;
import com.a705.hellogifty.api.dto.token.TokenRequestDto;
import com.a705.hellogifty.api.repository.GifticonRepository;
import com.a705.hellogifty.api.repository.RefreshTokenRepository;
import com.a705.hellogifty.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GifticonService {

    private final GifticonRepository gifticonRepository;
    private final UserRepository userRepository;

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public List<GifticonListResponseDto> myAllGifticon(Long userId) {


        List<GifticonListResponseDto> list = new ArrayList<>();

        for (Gifticon gifticon : gifticonRepository.findByUserId(user.getId())) {
            list.add(new GifticonListResponseDto(gifticon));
        }
        return list;
    }
}
