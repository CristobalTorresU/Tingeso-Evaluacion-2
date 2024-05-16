package com.example.reports.services;

import com.example.reports.entities.TypeReportEntity;
import com.example.reports.repositories.TypeReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TypeReportService {
    @Autowired
    TypeReportRepository typeReportRepository;
    /*
    @Autowired
    VehicleService vehicleService;
    @Autowired
    RepairService repairService;
     */

    public ArrayList<TypeReportEntity> getTypeReports() {
        return (ArrayList<TypeReportEntity>) typeReportRepository.findAll();
    }

    public void makeBlankReport() {
        typeReportRepository.deleteAll();

        String[] repairNames = {"Reparaciones del Sistema de Frenos",
                "Servicio del Sistema de Refrigeración",
                "Reparaciones del Motor",
                "Reparaciones de la Transmisión",
                "Reparación del Sistema Eléctrico",
                "Reparaciones del Sistema de Escape",
                "Reparación de Neumáticos y Ruedas",
                "Reparaciones de la Suspensión y la Dirección",
                "Reparación del Sistema de Aire Acondicionado y Calefacción",
                "Reparaciones del Sistema de Combustible",
                "Reparación y Reemplazo del Parabrisas y Cristales"};
        String[] types = {"Sedán","Hatchback","SUV","Pickup","Furgoneta"};

        // Genera cada combinacion
        for (int i = 1 ; i <= 11 ; i++) {
            for (int j = 0 ; j < 5 ; j++) {
                TypeReportEntity report = new TypeReportEntity();
                report.setRepairName(repairNames[i-1]);
                report.setReparationType(i);
                report.setType(types[j]);
                report.setQuantity(0);
                report.setTotalAmount(0);

                typeReportRepository.save(report);
            }
        }
    }

    /*
    public List<TypeReportEntity> makeReport() {
        // Se traen todas las reparaciones
        List<RepairEntity> repairs = repairService.getRepairs();

        // Se revisan todas y se asignan a algun typeReport
        for (RepairEntity repair : repairs) {
            TypeReportEntity report = typeReportRepository.findByReparationTypeAndType(repair.getReparationType(),vehicleService.getVehicleByPlate(repair.getPlate()).getType());
            report.setQuantity(report.getQuantity() + 1);
            report.setTotalAmount(report.getTotalAmount() + repair.getTotalAmount());
            typeReportRepository.save(report);
        }

        List<TypeReportEntity> typeReports = typeReportRepository.findAll();

        return typeReports;
    }
    */

    public List<TypeReportEntity> getTypeOrdered() {
        return typeReportRepository.orderByTotalAmount();
    }
}
