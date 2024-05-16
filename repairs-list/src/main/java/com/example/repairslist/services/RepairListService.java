package com.example.repairslist.services;

import com.example.repairslist.entities.RepairListEntity;
import com.example.repairslist.repositories.RepairListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RepairListService {
    @Autowired
    RepairListRepository repairListRepository;

    public ArrayList<RepairListEntity> getRepairsList() {
        return (ArrayList<RepairListEntity>) repairListRepository.findAll();
    }

    public RepairListEntity getRepairListById(Long id) {
        return repairListRepository.findById(id).get();
    }

    public RepairListEntity getRepairListByName(String name) {
        return repairListRepository.findByRepairName(name);
    }

    public RepairListEntity saveRepairList(RepairListEntity repairList) {
        return repairListRepository.save(repairList);
    }

    public boolean deleteRepairList(Long id) throws Exception {
        try{
            repairListRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
