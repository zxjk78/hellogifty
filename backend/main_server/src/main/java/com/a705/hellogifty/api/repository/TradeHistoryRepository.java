package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.TradeHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeHistoryRepository extends JpaRepository<TradeHistory, Long> {

}
