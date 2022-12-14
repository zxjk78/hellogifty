package com.a705.hellogifty.api.dto.chatroom;

import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.user.UserInfoResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomUsersResponseDto {

    private UserInfoResponseDto seller;
    private UserInfoResponseDto buyer;

    public ChatRoomUsersResponseDto(User seller, User buyer) {
        this.seller = new UserInfoResponseDto(seller);
        this.buyer = new UserInfoResponseDto(buyer);
    }
}
