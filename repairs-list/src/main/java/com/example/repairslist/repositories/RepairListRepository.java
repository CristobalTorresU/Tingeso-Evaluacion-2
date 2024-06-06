package com.example.repairslist.repositories;

import com.example.repairslist.entities.RepairListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepairListRepository extends JpaRepository<RepairListEntity, Long> {
    public RepairListEntity findByRepairName(String name);

    @Query(value = "SELECT repair_list.repairName FROM repair_list", nativeQuery = true)
    public List<String> findRepairNames();
}
