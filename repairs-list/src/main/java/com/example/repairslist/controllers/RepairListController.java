package com.example.repairslist.controllers;

import com.example.repairslist.entities.RepairListEntity;
import com.example.repairslist.services.RepairListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/repair-list")
@CrossOrigin("*")
public class RepairListController {
    @Autowired
    RepairListService repairListService;

    @GetMapping("/")
    public ResponseEntity<List<RepairListEntity>> listRepairList() {
        List<RepairListEntity> repairs = repairListService.getRepairsList();
        return ResponseEntity.ok(repairs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RepairListEntity> getRepairListById(@PathVariable Long id) {
        RepairListEntity repair = repairListService.getRepairListById(id);
        return ResponseEntity.ok(repair);
    }

    @GetMapping("/by-repair/{repairName}")
    public ResponseEntity<RepairListEntity> getRepairListByName(@PathVariable String repairName) {
        RepairListEntity repair = repairListService.getRepairListByName(repairName);
        return ResponseEntity.ok(repair);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<RepairListEntity> deleteRepairList(@PathVariable Long id) throws Exception {
        var isDeleted = repairListService.deleteRepairList(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/")
    public ResponseEntity<RepairListEntity> updateRepairList(@PathVariable Long id, @RequestBody RepairListEntity repair) {
        RepairListEntity repairUpdated = repairListService.saveRepairList(repair);
        return ResponseEntity.ok(repairUpdated);
    }

    @PostMapping("/")
    public ResponseEntity<RepairListEntity> saveRepairList(@RequestBody RepairListEntity repair) {
        RepairListEntity repairNew = repairListService.saveRepairList(repair);
        return ResponseEntity.ok(repairNew);
    }
}
