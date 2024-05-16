package com.example.reports.repositories;

import com.example.reports.entities.ComparativeReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ComparativeReportRepository extends JpaRepository<ComparativeReportEntity, Long>{
    @Query(value = "SELECT * FROM comparative_report WHERE comparative_report.repair_name = :repair", nativeQuery = true)
    public ComparativeReportEntity findByRepair(String repair);
}
