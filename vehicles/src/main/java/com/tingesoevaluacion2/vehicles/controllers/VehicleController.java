package com.tingesoevaluacion2.vehicles.controllers;

import com.tingesoevaluacion2.vehicles.entities.VehicleEntity;
import com.tingesoevaluacion2.vehicles.services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin("*")
public class VehicleController {
    @Autowired
    VehicleService vehicleService;

    @GetMapping("/")
    public ResponseEntity<List<VehicleEntity>> listVehicles() {
        List<VehicleEntity> vehicles = vehicleService.getVehicles();
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleEntity> getVehicleById(@PathVariable Long id) {
        VehicleEntity vehicle = vehicleService.getVehicleById(id);
        return ResponseEntity.ok(vehicle);
    }

    @GetMapping("/by-plate/{plate}")
    public ResponseEntity<VehicleEntity> getVehicleByPlate(@PathVariable String plate) {
        VehicleEntity vehicle = vehicleService.getVehicleByPlate(plate);
        return ResponseEntity.ok(vehicle);
    }

    @PostMapping("/")
    public ResponseEntity<VehicleEntity> saveVehicle(@RequestBody VehicleEntity vehicle) {
        VehicleEntity vehicleNew = vehicleService.saveVehicle(vehicle);
        return ResponseEntity.ok(vehicleNew);
    }

    @PutMapping("/")
    public ResponseEntity<VehicleEntity> updateVehicle(@RequestBody VehicleEntity vehicle) {
        VehicleEntity vehicleUpdated = vehicleService.updateVehicle(vehicle);
        return ResponseEntity.ok(vehicleUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<VehicleEntity> deleteVehicle(@PathVariable Long id) throws Exception {
        var isDeleted = vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }
}
