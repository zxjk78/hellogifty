package com.a705.hellogifty.api.dto.chatroom;

import com.a705.hellogifty.api.domain.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class ChatRoomListItemResponseDto {

    private Long chatRoomId;
    private SimpleTradePostInfo tradePostInfo;
    private SimpleUserInfo seller;
    private SimpleUserInfo buyer;

    public ChatRoomListItemResponseDto(ChatRoom chatRoom) {
        this.chatRoomId = chatRoom.getId();
        this.tradePostInfo = new SimpleTradePostInfo(chatRoom.getTradePost().getId(), chatRoom.getTradePost().getTitle());
        this.seller = new SimpleUserInfo(chatRoom.getTradePost().getUser().getId(), chatRoom.getTradePost().getUser().getName());
        this.buyer = new SimpleUserInfo(chatRoom.getBuyer().getId(), chatRoom.getBuyer().getName());
    }
}

@Getter
@AllArgsConstructor
class SimpleUserInfo {
    private Long id;
    private String name;
}

@Getter
@AllArgsConstructor
class SimpleTradePostInfo {
    private Long id;
    private String title;
}
