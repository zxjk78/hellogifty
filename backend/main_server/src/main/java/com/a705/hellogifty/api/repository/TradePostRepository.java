package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.TradePost;
import com.a705.hellogifty.api.dto.trade_post.TradePostListResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TradePostRepository extends JpaRepository<TradePost, Long> {

    Optional<TradePostListResponseDto> findByTitle(String title);
}
