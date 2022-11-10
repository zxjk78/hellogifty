package com.a705.hellogifty.api.repository;

import com.a705.hellogifty.api.domain.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

}
