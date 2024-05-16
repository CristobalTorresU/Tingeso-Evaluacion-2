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

    // TODO: Hacer que tome el ultimo año solamente.
    @Query(value = "SELECT * FROM detail d WHERE deta.plate = :plate AND d.date BETWEEN ?2 AND ?3", nativeQuery = true)
    List<DetailEntity> findByPlateAndDateBetween(@Param("plate") String plate);
}
