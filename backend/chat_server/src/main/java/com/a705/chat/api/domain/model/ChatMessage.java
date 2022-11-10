package com.a705.chat.api.domain.model;

import com.a705.chat.api.domain.enums.MessageType;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Document
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

    @Id
    private String id;

    private Long chatRoomId;

    private Long userId;

    private MessageType messageType;

    private String text;

    @CreatedDate // 생성된 시간 저장
    private LocalDateTime time;

}
