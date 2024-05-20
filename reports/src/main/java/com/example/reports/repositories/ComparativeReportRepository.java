package com.example.reports.repositories;

import com.example.reports.entities.ComparativeReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ComparativeReportRepository extends JpaRepository<ComparativeReportEntity, Long>{
    public ComparativeReportEntity findByRepair(String repairName);
    /*
    @Query(value = "SELECT * FROM comparative_report WHERE comparative_report.repair = :repairName", nativeQuery = true)
    public ComparativeReportEntity findByRepair(@Param("repairName") String repairName);
     */
}
