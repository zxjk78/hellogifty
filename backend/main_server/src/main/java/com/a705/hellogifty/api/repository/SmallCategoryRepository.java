package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.LargeCategory;
import com.a705.hellogifty.api.domain.entity.SmallCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SmallCategoryRepository extends JpaRepository<SmallCategory, Short> {

    Optional<SmallCategory> findById(Short id);

    Optional<List<SmallCategory>> findByLargeCategory(LargeCategory largeCategory);
}
