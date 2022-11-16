package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.*;
import com.a705.hellogifty.api.dto.trade_post.TradePostListResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TradePostRepository extends JpaRepository<TradePost, Long> {

    Optional<List<TradePost>> findByTitleContains(String title);

    Optional<List<TradePost>> findByGifticon_SmallCategory(SmallCategory smallCategory);

    Optional<List<TradePost>> findByGifticon_SmallCategory_LargeCategory(LargeCategory largeCategory);

    Optional<List<TradePost>> findByTitleContainsAndGifticon_SmallCategory(String title, SmallCategory smallCategory);

    Optional<List<TradePost>> findByTitleContainsAndGifticon_SmallCategory_LargeCategory(String title, LargeCategory largeCategory);

    Optional<TradePost> findById(Long id);

    Optional<TradePost> findByUserAndId(User user, Long id);

    void deleteByUserAndId(User user, Long id);

    Optional<List<TradePost>> findByUser(User user);
}
