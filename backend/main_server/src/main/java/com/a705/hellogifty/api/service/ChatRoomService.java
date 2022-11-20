package com.a705.hellogifty.api.service;

import com.a705.hellogifty.advice.exception.ChatRoomNotFoundException;
import com.a705.hellogifty.advice.exception.TradePostNotFoundException;
import com.a705.hellogifty.api.domain.entity.*;
import com.a705.hellogifty.api.dto.chatroom.ChatRoomListItemResponseDto;
import com.a705.hellogifty.api.dto.chatroom.ChatRoomUsersResponseDto;
import com.a705.hellogifty.api.repository.ChatRoomRepository;
import com.a705.hellogifty.api.repository.TradeHistoryRepository;
import com.a705.hellogifty.api.repository.TradePostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final TradePostRepository tradePostRepository;
    private final TradeHistoryRepository tradeHistoryRepository;

    @Transactional
    public Long getChatRoomId(User loginUser, Long tradePostId) throws Exception{
        TradePost tradePost = tradePostRepository.findById(tradePostId).orElseThrow(TradePostNotFoundException::new);
        if(loginUser.getId().equals(tradePost.getUser().getId())) throw new IllegalAccessException();
        ChatRoom chatRoom = chatRoomRepository.findByTradePostAndBuyer(tradePost, loginUser).orElse(null);
        if (chatRoom == null) {
            chatRoom = ChatRoom.builder()
                    .tradePost(tradePost)
                    .buyer(loginUser)
                    .build();
            chatRoomRepository.save(chatRoom);
        }
        return chatRoom.getId();
    }

    @Transactional
    public void completeTrade(User loginUser, Long chatRoomId) throws Exception {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(ChatRoomNotFoundException::new);

        TradePost tradePost = tradePostRepository.findById(chatRoom.getTradePost().getId()).orElseThrow(TradePostNotFoundException::new);
        if (!tradePost.getUser().getId().equals(loginUser.getId())) throw new IllegalAccessException();

        // 소유주 변경
        Gifticon gifticon = tradePost.getGifticon();
        gifticon.changeUser(chatRoom.getBuyer());

        // 거래글 상태 변경
        tradePost.changeStateTosoldOut();

        // 거래내역 추가
        TradeHistory tradeHistory = TradeHistory.createTradeHistory(tradePost, loginUser, chatRoom.getBuyer());
        tradeHistoryRepository.save(tradeHistory);
    }


    public ChatRoomUsersResponseDto getChatRoomUsers(User loginUser, Long chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findByIdWithSellerAndBuyer(chatRoomId).orElseThrow(ChatRoomNotFoundException::new);
        User seller = chatRoom.getTradePost().getUser();
        User buyer = chatRoom.getBuyer();

        return new ChatRoomUsersResponseDto(seller, buyer);
    }

    public List<ChatRoomListItemResponseDto> getMyChatRoomList(User loginUser) {
        return chatRoomRepository.findBySellerOrBuyerWithSellerAndBuyer(loginUser).stream()
                .map(ChatRoomListItemResponseDto::new)
                .collect(Collectors.toList());
    }
}
