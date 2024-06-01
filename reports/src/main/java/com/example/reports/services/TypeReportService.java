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
        for (int j = 0 ; j < repairs.size(); j++) {
            for (int i = 0; i < 5; i++) {
                TypeReportEntity report = new TypeReportEntity();
                report.setRepairName(repairs.get(j));
                report.setQuantitySedan(0);
                report.setQuantityHatchback(0);
                report.setQuantitySUV(0);
                report.setQuantityPickup(0);
                report.setQuantityFurgoneta(0);
                report.setTotalAmountSedan(0);
                report.setTotalAmountHatchback(0);
                report.setTotalAmountSUV(0);
                report.setTotalAmountPickup(0);
                report.setTotalAmountFurgoneta(0);

                typeReportRepository.save(report);
            }
        }
    }

    public void addToReport(int amount, String repairName, String type) {
        TypeReportEntity report = typeReportRepository.findByRepairNameAndType(repairName, type);
        switch (type) {
            case "Sedán":
                report.setQuantitySedan(report.getQuantitySedan() + 1);
                report.setTotalAmountSedan(report.getTotalAmountSedan() + amount);
                break;
            case "Hatchback":
                report.setQuantityHatchback(report.getQuantityHatchback() + 1);
                report.setTotalAmountHatchback(report.getTotalAmountHatchback() + amount);
                break;
            case "SUV":
                report.setQuantitySUV(report.getQuantitySUV() + 1);
                report.setTotalAmountSUV(report.getTotalAmountSUV() + amount);
                break;
            case "Pickup":
                report.setQuantityPickup(report.getQuantityPickup() + 1);
                report.setTotalAmountPickup(report.getTotalAmountPickup() + amount);
                break;
            case "Furgoneta":
                report.setQuantityFurgoneta(report.getQuantityFurgoneta() + 1);
                report.setTotalAmountFurgoneta(report.getTotalAmountFurgoneta() + amount);
                break;
        }
        typeReportRepository.save(report);
    }

    public List<DetailModel> getDetailsByMonthAndYear(int month, int year) {
        ParameterizedTypeReference<List<DetailModel>> responseType = new ParameterizedTypeReference<List<DetailModel>>() {};
        return restTemplate.exchange("http://repairs/api/repairs/details/month/" + month + "/year/" + year, HttpMethod.GET, null, responseType).getBody();
    }

    public String getType(String plate) {
        return restTemplate.getForObject("http://repairs/api/details/vehicles/type/" + plate, String.class);
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
        return restTemplate.exchange("http://repairs/api/details/repair-list/list", HttpMethod.GET, null, responseType).getBody();
    }
}
