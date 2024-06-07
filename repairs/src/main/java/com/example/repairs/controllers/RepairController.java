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
    @Autowired
    DetailService detailService;

    /*
    @GetMapping("/")
    public ResponseEntity<List<RepairEntity>> listRepairs() {
        List<RepairEntity> repairs = repairService.getRepairs();
        return ResponseEntity.ok(repairs);
    }
    */

    @GetMapping("/")
    public ResponseEntity<List<Map<String, Object>>> listRepairs() {
        List<RepairEntity> repairs = repairService.getRepairs();
        List<Map<String, Object>> repairsWithVehicles = repairs.stream().map(repair -> {
            // TODO: Hacer que con getVehicleByRepairId se obtenga el vehículo de la reparación, tomando solo el primer objeto.
            VehicleModel vehicle = repairService.getVehicleByRepairId(repair.getId());
            return Map.of(
                    "repair", repair,
                    "vehicle", vehicle
            );
        }).collect(Collectors.toList());
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

    @GetMapping("/calculate")
    public ResponseEntity<Void> calculatePrice(@RequestParam("plate") String plate,
                                               @RequestParam("checkinDate") String checkinDate,
                                               @RequestParam("checkinHour") String checkinHour,
                                               @RequestParam("repair") List<Integer> repairsId,
                                               @RequestParam("exitDate") String exitDate,
                                               @RequestParam("exitHour") String exitHour,
                                               @RequestParam("collectDate") String collectDate,
                                               @RequestParam("collectHour") String collectHour) {
        repairService.calculateMultipleTotalAmount(plate, checkinDate, checkinHour, repairsId,
                exitDate, exitHour, collectDate, collectHour);
        return ResponseEntity.noContent().build();
    }

    /*
    // TODO: Implementar controlador para calcular las reparaciones con las fechas y horas puestas por separado.
    @GetMapping("/calculate-checkin")
    public ResponseEntity<Void> calculateCheckin(@RequestParam("plate") String plate,
                                               @RequestParam("checkinDate") String checkinDate,
                                               @RequestParam("checkinHour") String checkinHour,
                                               @RequestParam("repair") List<Integer> repairsId) {
        repairService.registerRepairAndCheckin(plate, checkinDate, checkinHour, repairsId);
        return ResponseEntity.noContent().build();
    }

    // TODO: Implementar controlador para calcular las reparaciones con las fechas y horas puestas por separado.
    @PutMapping("/calculate-exit/{id}")
    public ResponseEntity<RepairEntity> calculateExit(@RequestBody RepairEntity repair) {
        RepairEntity repairUpdated = repairService.updateRepairAndExit(repair);
        return ResponseEntity.ok(repairUpdated);
    }

    // TODO: Implementar controlador para calcular las reparaciones con las fechas y horas puestas por separado.
    @PutMapping("/calculate-collect/{id}")
    public ResponseEntity<RepairEntity> calculateCollect(@RequestBody RepairEntity repair) {
        RepairEntity repairUpdated = repairService.updateRepairAndCollect(repair);
        return ResponseEntity.noContent().build();
    }
    */

    // TODO: Implementar controlador para calcular las reparaciones con las fechas y horas puestas por separado.
    @PutMapping("/calculate-exit/{id}")
    public ResponseEntity<Void> calculateExit(@PathVariable Long id,
                                               @RequestParam("exitDate") String exitDate,
                                               @RequestParam("exitHour") String exitHour) {
        repairService.updateRepairAndExit(id, exitDate, exitHour);
        return ResponseEntity.noContent().build();
    }

    // TODO: Implementar controlador para calcular las reparaciones con las fechas y horas puestas por separado.
    @PutMapping("/calculate-collect/{id}")
    public ResponseEntity<Void> calculateCollect(@PathVariable Long id,
                                               @RequestParam("collectDate") String collectDate,
                                               @RequestParam("collectHour") String collectHour) {
        repairService.updateRepairAndCollect(id, collectDate, collectHour);
        return ResponseEntity.noContent().build();
    }

    // Details
    @GetMapping("/details/")
    public ResponseEntity<List<DetailEntity>> listDetails() {
        List<DetailEntity> details = detailService.getDetails();
        return ResponseEntity.ok(details);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<DetailEntity> getDetailById(@PathVariable Long id) {
        DetailEntity detail = detailService.getDetailById(id);
        return ResponseEntity.ok(detail);
    }

    @GetMapping("/details/month/{month}/year/{year}")
    public ResponseEntity<List<DetailEntity>> getDetailsByMonthAndYear(@PathVariable int month,
                                                                      @PathVariable int year) {
        List<DetailEntity> details = detailService.getByMonthAndYear(month, year);
        return ResponseEntity.ok(details);
    }

    @GetMapping("/vehicles/{plate}")
    public ResponseEntity<String> getVehicleType(@PathVariable String plate) {
        String type = detailService.getVehicleType(plate);
        return ResponseEntity.ok(type);
    }

    @GetMapping("/details/list/{repairId}")
    public ResponseEntity<List<DetailEntity>> getDetailsByRepairId(@PathVariable Long repairId) {
        List<DetailEntity> details = detailService.getDetailsByRepairId(repairId);
        return ResponseEntity.ok(details);
    }

    @GetMapping("/details/vehicles/{plate}")
    public ResponseEntity<List<DetailEntity>> getDetailsByPlate(@PathVariable String plate) {
        List<DetailEntity> details = detailService.getDetailsByPlate(plate);
        return ResponseEntity.ok(details);
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
