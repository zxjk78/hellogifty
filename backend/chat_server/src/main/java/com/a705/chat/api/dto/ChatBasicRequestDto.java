package com.a705.chat.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatBasicRequestDto {

    private Long chatRoomId;
    private Long userId;
}
