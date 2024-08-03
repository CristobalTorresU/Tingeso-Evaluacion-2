package com.tingesoevaluacion2.vehicles.services;

import com.tingesoevaluacion2.vehicles.entities.VehicleEntity;
import com.tingesoevaluacion2.vehicles.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class VehicleService {
    @Autowired
    VehicleRepository vehicleRepository;

    public ArrayList<VehicleEntity> getVehicles() {
        return (ArrayList<VehicleEntity>) vehicleRepository.findAll();
    }

    public boolean validPlate(String plate) {
        return plate.matches("[A-Z]{4}[0-9]{2}");
    }

    public VehicleEntity saveVehicle(VehicleEntity vehicle) {
        if (vehicleRepository.findByPlate(vehicle.getPlate()) != null || !validPlate(vehicle.getPlate())) {
            return null;
        }
        return vehicleRepository.save(vehicle);
    }

    public VehicleEntity getVehicleById(Long id) {
        return vehicleRepository.findById(id).get();
    }

    public VehicleEntity getVehicleByPlate(String plate) {
        return vehicleRepository.findByPlate(plate);
    }

    public VehicleEntity updateVehicle(VehicleEntity vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public boolean deleteVehicle(Long id) throws Exception {
        try{
            vehicleRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
