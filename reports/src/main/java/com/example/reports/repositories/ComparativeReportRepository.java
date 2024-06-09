package com.example.reports.repositories;

import com.example.reports.entities.ComparativeReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ComparativeReportRepository extends JpaRepository<ComparativeReportEntity, Long>{
    @Query(value = "SELECT * FROM comparative_report ORDER BY id ASC", nativeQuery = true)
    public ArrayList<ComparativeReportEntity> getAll();

    public ComparativeReportEntity findByRepair(String repairName);
}
