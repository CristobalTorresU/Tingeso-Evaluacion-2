package com.example.repairs.controllers;

import com.example.repairs.entities.DetailEntity;
import com.example.repairs.entities.RepairEntity;
import com.example.repairs.models.BonusModel;
import com.example.repairs.models.RepairListModel;
import com.example.repairs.models.VehicleModel;
import com.example.repairs.services.DetailService;
import com.example.repairs.services.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/repairs")
public class RepairController {
    @Autowired
    RepairService repairService;

    @GetMapping("/")
    public ResponseEntity<List<Map<String, Object>>> listRepairs() {
        List<Map<String, Object>> repairsWithVehicles = repairService.combineRepairsAndVehicles();
        return ResponseEntity.ok(repairsWithVehicles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RepairEntity> getRepairById(@PathVariable Long id) {
        RepairEntity repair = repairService.getRepairById(id);
        return ResponseEntity.ok(repair);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RepairEntity> deleteRepair(@PathVariable Long id) throws Exception {
        var isDeleted = repairService.deleteRepair(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/calculate-checkin")
    public ResponseEntity<Void> calculateCheckin(@RequestParam("plate") String plate,
                                               @RequestParam("checkinDate") String checkinDate,
                                               @RequestParam("checkinHour") String checkinHour,
                                               @RequestParam("repair") List<Integer> repairsId) {
        repairService.registerRepairAndCheckin(plate, checkinDate, checkinHour, repairsId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/calculate-exit/{id}")
    public ResponseEntity<Void> calculateExit(@PathVariable Long id,
                                               @RequestParam("exitDate") String exitDate,
                                               @RequestParam("exitHour") String exitHour) {
        repairService.updateRepairAndExit(id, exitDate, exitHour);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/calculate-collect/{id}")
    public ResponseEntity<Void> calculateCollect(@PathVariable Long id,
                                               @RequestParam("collectDate") String collectDate,
                                               @RequestParam("collectHour") String collectHour) {
        repairService.updateRepairAndCollect(id, collectDate, collectHour);
        return ResponseEntity.noContent().build();
    }

    // RestTemplate
    @GetMapping("/bonuses/{brand}")
    public ResponseEntity<BonusModel> getBonus(@PathVariable String brand) {
        BonusModel bonus = repairService.getBonus(brand);
        return ResponseEntity.ok(bonus);
    }

    @GetMapping("/repair-list/{repair}")
    public ResponseEntity<RepairListModel> getRepairList(@PathVariable String repair) {
        RepairListModel repairList = repairService.getRepairList(repair);
        return ResponseEntity.ok(repairList);
    }
}
