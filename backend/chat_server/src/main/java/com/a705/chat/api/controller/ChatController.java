package com.a705.chat.api.controller;

import com.a705.chat.api.domain.model.ChatMessage;
import com.a705.chat.api.dto.ChatBasicRequestDto;
import com.a705.chat.api.dto.ChatMessageRequestDto;
import com.a705.chat.api.dto.ChatMessageResponseDto;
import com.a705.chat.api.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageRepository chatMessageRepository;

    private final SimpMessagingTemplate webSocket;

    // @SendTo 어노테이션으로 해당 topics를 수신하는 클라이언트 웹소켓에 메시지를 전달, 리턴할 타입 정의 필요
//    @MessageMapping("/sendTo/{chatRoomId}")
//    @SendTo("/topics/sendTo")
//    public String SendToMessage(@DestinationVariable("chatRoomId") String chatRoomId,
//                                String message) throws Exception {
//        System.out.println("채팅 수신 SEND TO " + message);
//        return message;
//    }

    // SendTo 어노테이션 대신 SimpMessagingTemplate으로 응답 값을 보냄, 이 경우 해당 함수의 리턴값은 void
    // convertAndSend 함수로 특정 유저에게 전달 가능
    @MessageMapping("/chat/enter")
    public void SendTemplateMessage(ChatBasicRequestDto chatBasicRequestDto) {
        String returnMessage = "ChatRoom " + chatBasicRequestDto.getChatRoomId() + "에 유저 " + chatBasicRequestDto.getUserId() + " 참가";
        System.out.println(returnMessage);

        List<ChatMessageResponseDto> loadMessages = chatMessageRepository.findByChatRoomId(chatBasicRequestDto.getChatRoomId())
                .stream()
                .map(ChatMessageResponseDto::new).collect(Collectors.toList());
        webSocket.convertAndSend("/sub/chat/load/room/" + chatBasicRequestDto.getChatRoomId() + "/user/" + chatBasicRequestDto.getUserId(), loadMessages);

        // 유저 입장 메시지 포함
//        ChatMessage newChatMessage = ChatMessage.builder()
//                .chatRoomId(chatBasicRequestDto.getChatRoomId())
//                .userId(chatBasicRequestDto.getUserId())
//                .messageType(MessageType.ENTER)
//                .build();
//        chatMessageRepository.save(newChatMessage);
//        ChatMessageResponseDto sendMessageDto = new ChatMessageResponseDto(newChatMessage);
//
//        List<ChatMessageResponseDto> sendMessages = new ArrayList<>();
//        sendMessages.add(sendMessageDto);
//        webSocket.convertAndSend("/sub/chat/room/" + chatBasicRequestDto.getChatRoomId(), sendMessages);
    }


    @MessageMapping("/chat/message")
    public void SendTemplateMessage(ChatMessageRequestDto chatMessageDto) {
        String returnMessage = "user " + chatMessageDto.getUserId() + " : " + chatMessageDto.getText();
        System.out.println(returnMessage);

        ChatMessage newChatMessage = ChatMessage.builder()
                .chatRoomId(chatMessageDto.getChatRoomId())
                .userId(chatMessageDto.getUserId())
                .messageType(chatMessageDto.getMessageType())
                .text(chatMessageDto.getText())
                .time(LocalDateTime.now())
                .build();
        chatMessageRepository.save(newChatMessage);

        List<ChatMessageResponseDto> res = new ArrayList<>();
        res.add(new ChatMessageResponseDto(newChatMessage));
        webSocket.convertAndSend("/sub/chat/room/" + chatMessageDto.getChatRoomId(), res);
    }

    @RequestMapping(value = "/api")
    public void SendAPI() {
        webSocket.convertAndSend("/topics/api", "API");
    }
}


