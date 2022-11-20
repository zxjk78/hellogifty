package com.a705.chat.api.dto;

import com.a705.chat.api.domain.enums.MessageType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatMessageRequestDto extends ChatBasicRequestDto{

    private String text;
    private MessageType messageType;

}
