package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.TradeHistory;
import com.a705.hellogifty.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TradeHistoryRepository extends JpaRepository<TradeHistory, Long> {

    Optional<TradeHistory> findByTradePostIdAndSellerAndBuyer(Long tradePostId, User loginUser, User targetUser);

    @Query("select th from TradeHistory th " +
            "join fetch th.tradePost tp " +
            "join fetch tp.gifticon g " +
            "join fetch g.smallCategory sc " +
            "where th.seller=:user")
    List<TradeHistory> findAllBySellerWithTradePostWithGifticonWithBrand(@Param("user") User loginUser);

    @Query("select th from TradeHistory th " +
            "join fetch th.tradePost tp " +
            "join fetch tp.gifticon g " +
            "join fetch g.smallCategory sc " +
            "where th.buyer=:user")
    List<TradeHistory> findAllByBuyerWithTradePostWithGifticonWithBrand(@Param("user") User loginUser);
}
