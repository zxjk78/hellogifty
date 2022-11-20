package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.LargeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LargeCategoryRepository extends JpaRepository<LargeCategory, Short> {

    Optional<LargeCategory> findById(Short id);

}
