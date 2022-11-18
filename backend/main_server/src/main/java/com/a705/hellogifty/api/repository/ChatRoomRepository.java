package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.ChatRoom;
import com.a705.hellogifty.api.domain.entity.TradePost;
import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.dto.chatroom.ChatRoomListItemResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByTradePostAndBuyer(TradePost tradePost, User buyer);

    @Query("select cr from ChatRoom cr " +
            "join fetch cr.buyer b " +
            "join fetch cr.tradePost tp " +
            "join fetch tp.user s " +
            "where cr.id=:chatRoomId")
    Optional<ChatRoom> findByIdWithSellerAndBuyer(@Param("chatRoomId") Long chatRoomId);


    @Query("select cr " +
            "from ChatRoom cr " +
            "join fetch cr.buyer b " +
            "join fetch cr.tradePost tp " +
            "join fetch tp.user s " +
            "where tp.user=:user or s=:sameUser")
    List<ChatRoom> findBySellerOrBuyerWithSellerAndBuyer(@Param("user") User user, @Param("sameUser") User sameUser);
}
