package com.example.repairslist.repositories;

import com.example.repairslist.entities.RepairListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepairListRepository extends JpaRepository<RepairListEntity, Long> {
    public RepairListEntity findByRepairName(String name);
}
