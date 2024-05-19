package com.example.repairs.repositories;

import com.example.repairs.entities.DetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetailRepository extends JpaRepository<DetailEntity, Long>{
    public List<DetailEntity> findByPlate(String plate);

    //public List<DetailEntity> findByRepair_Id(Long repair_id);

    @Query(value = "SELECT * FROM detail WHERE EXTRACT(MONTH FROM detail.date) = :month AND EXTRACT(YEAR FROM detail.date) = :year", nativeQuery = true)
    List<DetailEntity> findByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query(value = "SELECT * FROM detail WHERE detail.plate = :plate AND detail.date >= CURRENT_DATE - INTERVAL '1 YEAR'", nativeQuery = true)
    List<DetailEntity> findByPlateLastYear(@Param("plate") String plate);
}
