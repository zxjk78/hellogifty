package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.Evaluation;
import com.a705.hellogifty.api.domain.entity.TradeHistory;
import com.a705.hellogifty.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EvalutationRepository extends JpaRepository<Evaluation, Long> {

    Optional<Evaluation> findTop1ByTradeHistoryAndEvaluator(TradeHistory tradeHistory, User evaluator);

}
