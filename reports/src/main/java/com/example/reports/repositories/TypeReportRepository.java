package com.example.reports.repositories;

import com.example.reports.entities.TypeReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeReportRepository extends JpaRepository<TypeReportEntity, Long>{
    @Query(value = "SELECT * FROM type_report WHERE type_report.reparation_type = :reparationType AND type_report.type = :type", nativeQuery = true)
    public TypeReportEntity findByReparationTypeAndType(@Param("reparationType") int reparationType,
                                                        @Param("type") String type);

    @Query(value = "SELECT * FROM type_report ORDER BY type_report.total_amount DESC", nativeQuery = true)
    List<TypeReportEntity> orderByTotalAmount();
}
