package com.a705.chat.api.repository;

import com.a705.chat.api.domain.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, Long> {

    List<ChatMessage> findByChatRoomId(Long chatRoomId);
}
