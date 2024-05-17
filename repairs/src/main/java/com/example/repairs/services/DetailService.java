package com.example.repairs.services;

import com.example.repairs.entities.DetailEntity;
import com.example.repairs.models.VehicleModel;
import com.example.repairs.repositories.DetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class DetailService {
    @Autowired
    DetailRepository detailRepository;
    @Autowired
    RestTemplate restTemplate;

    public ArrayList<DetailEntity> getDetails() {
        return (ArrayList<DetailEntity>) detailRepository.findAll();
    }

    public DetailEntity saveDetail(DetailEntity detail) {
        return detailRepository.save(detail);
    }

    public DetailEntity getDetailById(Long id) {
        return detailRepository.findById(id).get();
    }

    public List<DetailEntity> getRepairById(Long id) {
        List<DetailEntity> detailAsList = new ArrayList<>();
        DetailEntity detail = detailRepository.findById(id).get();
        detailAsList.add(detail);
        return detailAsList;
    }

    /*
    public List<DetailEntity> getDetailsByRepair_Id(Long repair_id) {
        return detailRepository.findByRepair_Id(repair_id);
    }
    */

    public List<DetailEntity> getDetailsByPlate(String plate) {
        return detailRepository.findByPlateLastYear(plate);
    }

    public VehicleModel getVehicle(String plate) {
        return restTemplate.getForObject("http://vehicles:8090/api/vehicles/by-plate/" + plate, VehicleModel.class);
    }
}
