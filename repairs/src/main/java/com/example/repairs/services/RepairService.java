package com.example.repairs.services;

import com.example.repairs.entities.RepairEntity;
import com.example.repairs.repositories.RepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class RepairService {
    @Autowired
    RepairRepository repairRepository;
    @Autowired
    DetailService detailService;

    public ArrayList<RepairEntity> getRepairs() {
        return (ArrayList<RepairEntity>) repairRepository.findAll();
    }

    public RepairEntity getRepairById(Long id) {
        return repairRepository.findById(id).get();
    }

    public RepairEntity saveRepair(RepairEntity repair) {
        return repairRepository.save(repair);
    }

    public boolean deleteRepair(Long id) throws Exception {
        try{
            repairRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    /*
    TODO: Tomar lista de reparaciones desde el otro microservicio.
     */
    public boolean calculateTotalAmount(LocalDate checkinDate,
                                        LocalTime checkinHour,
                                        LocalDate collectDate,
                                        LocalTime collectHour,
                                        LocalDate exitDate,
                                        LocalTime exitHour) {
        return true;
    }
}
