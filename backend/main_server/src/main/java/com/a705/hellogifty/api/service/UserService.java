package com.a705.hellogifty.api.service;

import com.a705.hellogifty.advice.exception.UserNotFoundException;
import com.a705.hellogifty.api.domain.entity.Evaluation;
import com.a705.hellogifty.api.domain.entity.TradeHistory;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.UserInfoResponseDto;
import com.a705.hellogifty.api.dto.user.MyInfoResponseDto;
import com.a705.hellogifty.api.dto.user.UserProfileResponseDto;
import com.a705.hellogifty.api.repository.EvalutationRepository;
import com.a705.hellogifty.api.repository.TradeHistoryRepository;
import com.a705.hellogifty.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final TradeHistoryRepository tradeHistoryRepository;

    public MyInfoResponseDto getMyInfo(User loginUser) {

        List<TradeHistory> salesRecord = tradeHistoryRepository.findAllBySellerWithTradePostWithGifticonWithBrand(loginUser);
        List<TradeHistory> purchaseRecord = tradeHistoryRepository.findAllByBuyerWithTradePostWithGifticonWithBrand(loginUser);
        return new MyInfoResponseDto(loginUser, salesRecord, purchaseRecord);
    }

    public UserProfileResponseDto getUserInfo(Long id) {
        User user = userRepository.findByIdWithUserEvaluation(id).orElseThrow(UserNotFoundException::new);
        List<TradeHistory> salesRecord = tradeHistoryRepository.findAllBySellerWithTradePostWithGifticonWithBrand(user);
        return new UserProfileResponseDto(user, salesRecord);
    }
}
