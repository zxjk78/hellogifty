package com.a705.hellogifty.api.repository;


import com.a705.hellogifty.api.domain.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {

    Optional<RefreshToken> findByTokenKey(Long tokenKey);
    void deleteByTokenKey(Long tokenKey);
}
