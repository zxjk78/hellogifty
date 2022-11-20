package com.a705.chat.api.dto;

import com.a705.chat.api.domain.enums.MessageType;
import com.a705.chat.api.domain.model.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageResponseDto {

    private Long chatRoomId;
    private Long userId;
    private String text;
    private MessageType messageType;

    private LocalDateTime time;

    public ChatMessageResponseDto(ChatMessage chatMessage) {
        this.chatRoomId = chatMessage.getChatRoomId();
        this.userId = chatMessage.getUserId();
        this.text = chatMessage.getText();
        this.messageType = chatMessage.getMessageType();
        this.time = chatMessage.getTime();
    }
}
