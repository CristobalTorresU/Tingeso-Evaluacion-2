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

    @Query(value = "SELECT * FROM detail WHERE detail.plate = :plate AND detail.date >= CURRENT_DATE - INTERVAL '1 YEAR'", nativeQuery = true)
    List<DetailEntity> findByPlateLastYear(@Param("plate") String plate);
}
