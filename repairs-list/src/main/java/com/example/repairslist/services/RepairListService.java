package com.example.repairslist.services;

import com.example.repairslist.entities.RepairListEntity;
import com.example.repairslist.repositories.RepairListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class RepairListService {
    @Autowired
    RepairListRepository repairListRepository;
    @Autowired
    RestTemplate restTemplate;

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

    public RepairListEntity saveAndSendRepairList(RepairListEntity repairList) {
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

    public List<String> getRepairListNames() {
        ArrayList<RepairListEntity> repairs = (ArrayList<RepairListEntity>) repairListRepository.findAll();
        List<String> names = new ArrayList<>();
        for (RepairListEntity repair : repairs) {
            names.add(repair.getRepairName());
        }
        return names;
    }
}
