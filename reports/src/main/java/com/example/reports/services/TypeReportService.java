package com.example.reports.services;

import com.example.reports.entities.TypeReportEntity;
import com.example.reports.models.DetailModel;
import com.example.reports.repositories.TypeReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class TypeReportService {
    @Autowired
    TypeReportRepository typeReportRepository;
    @Autowired
    RestTemplate restTemplate;

    public ArrayList<TypeReportEntity> getTypeReports() {
        return (ArrayList<TypeReportEntity>) typeReportRepository.findAll();
    }

    public void makeBlankReport(List<String> repairs) {
        // Se eliminan todos los registros de la tabla.
        typeReportRepository.deleteAll();

        // Se crean los nuevos registros en blanco en la tabla.
        String[] types = {"Sedán", "Hatchback", "SUV", "Pickup", "Furgoneta"};
        for (int j = 0 ; j < repairs.size(); j++) {
            for (int i = 0; i < 5; i++) {
                TypeReportEntity report = new TypeReportEntity();
                report.setRepairName(repairs.get(j));
                report.setType(types[i]);
                report.setQuantity(0);
                report.setTotalAmount(0);

                typeReportRepository.save(report);
            }
        }
    }

    public void addToReport(int amount, String repairName, String type) {
        TypeReportEntity report = typeReportRepository.findByRepairNameAndType(repairName, type);
        report.setQuantity(report.getQuantity() + 1);
        report.setTotalAmount(report.getTotalAmount() + amount);
        typeReportRepository.save(report);
    }

    public List<DetailModel> getDetailsByMonthAndYear(int month, int year) {
        ParameterizedTypeReference<List<DetailModel>> responseType = new ParameterizedTypeReference<List<DetailModel>>() {};
        return restTemplate.exchange("http://repairs:8091/api/details/month/" + month + "/year/" + year, HttpMethod.GET, null, responseType).getBody();
    }

    public String getType(String plate) {
        return restTemplate.getForObject("http://repairs:8091/api/details/vehicles/type/" + plate, String.class);
    }

    public void makeReport(int month, int year) {
        List<DetailModel> details = getDetailsByMonthAndYear(month, year);
        for (int i = 0; i < details.size(); i++) {
            String type = getType(details.get(i).getPlate());
            addToReport(details.get(i).getAmount(), details.get(i).getRepairType(), type);
        }
    }

    public List<String> getRepairNames() {
        ParameterizedTypeReference<List<String>> responseType = new ParameterizedTypeReference<List<String>>() {};
        return restTemplate.exchange("http://repairs:8091/api/details/repair-list/list", HttpMethod.GET, null, responseType).getBody();
    }

    public List<TypeReportEntity> getTypeOrdered() {
        return typeReportRepository.orderByTotalAmount();
    }
}
