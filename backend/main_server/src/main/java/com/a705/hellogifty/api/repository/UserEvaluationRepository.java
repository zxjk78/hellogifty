package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.User;
import com.a705.hellogifty.api.domain.entity.UserEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserEvaluationRepository extends JpaRepository<UserEvaluation,Long> {

    Optional<UserEvaluation> findByUser(User targetUser);
}
