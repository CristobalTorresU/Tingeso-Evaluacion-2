package com.example.repairs.services;

import com.example.repairs.entities.DetailEntity;
import com.example.repairs.models.RepairListModel;
import com.example.repairs.models.VehicleModel;
import com.example.repairs.repositories.DetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.YearMonth;
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

    public boolean deleteDetail(Long id) throws Exception {
        try {
            detailRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public void deleteDetailsByRepairId(Long id) {
        detailRepository.deleteByRepair_id(id);
    }

    public List<DetailEntity> getDetailsByRepairId(Long id) {
        return detailRepository.findByRepair_id(id);
    }

    public List<DetailEntity> getDetailsByPlate(String plate) {
        return detailRepository.findByPlateLastYear(plate);
    }

    public VehicleModel getVehicle(String plate) {
        return restTemplate.getForObject("http://vehicles/api/vehicles/by-plate/" + plate, VehicleModel.class);
    }

    public String getVehicleType(String plate) {
        return restTemplate.getForObject("http://vehicles/api/vehicles/by-plate/" + plate, VehicleModel.class).getType();
    }

    public List<String> getRepairTypes() {
        ParameterizedTypeReference<List<RepairListModel>> responseType = new ParameterizedTypeReference<List<RepairListModel>>() {};
        List<RepairListModel> repairTypes = restTemplate.exchange("http://repairs-list/api/repair-list/", HttpMethod.GET, null, responseType).getBody();
        List<String> repairNames = new ArrayList<>();
        for (RepairListModel repairType : repairTypes) {
            repairNames.add(repairType.getRepairName());
        }

        return repairNames;
    }

    public List<DetailEntity> getByMonthAndYear(int month, int year) {
        return detailRepository.findByMonthAndYear(month, year);
    }
}
