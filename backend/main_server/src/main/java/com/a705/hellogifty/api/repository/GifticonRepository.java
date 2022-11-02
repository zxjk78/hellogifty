package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.Gifticon;
import com.a705.hellogifty.api.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GifticonRepository extends JpaRepository<Gifticon, Long> {


    Optional<List<Gifticon>> findByUserId(Long userId);

    Optional<Gifticon> findById(Long id);
}
