package com.example.reports.controllers;

import com.example.reports.entities.ComparativeReportEntity;
import com.example.reports.entities.TypeReportEntity;
import com.example.reports.models.DetailModel;
import com.example.reports.services.ComparativeReportService;
import com.example.reports.services.TypeReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/type-reports")
public class TypeReportController {
    @Autowired
    TypeReportService typeReportService;
    @Autowired
    ComparativeReportService comparativeReportService;

    @GetMapping("/")
    public ResponseEntity<List<TypeReportEntity>> listTypeReports() {
        List<TypeReportEntity> typeReports = typeReportService.getTypeReports();
        return ResponseEntity.ok(typeReports);
    }

    @GetMapping("/generate")
    public ResponseEntity<Void> bringTypeReports(@RequestParam("month") int month, @RequestParam("year") int year) {
        List<String> repairNames = typeReportService.getRepairNames();
        typeReportService.makeBlankReport(repairNames);
        typeReportService.makeReport(month, year);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ordered")
    public ResponseEntity<List<TypeReportEntity>> orderedTypeReports() {
        List<TypeReportEntity> reports = typeReportService.getTypeOrdered();
        return ResponseEntity.ok(reports);
    }

    // Comparative Reports
    @GetMapping("/comparative-reports/list")
    public ResponseEntity<List<ComparativeReportEntity>> listComparativeReports() {
        List<ComparativeReportEntity> comparativeReports = comparativeReportService.getComparativeReports();
        return ResponseEntity.ok(comparativeReports);
    }

    @GetMapping("/comparative-reports/generate")
    public ResponseEntity<Void> bringComparativeReports(@RequestParam("month") int month, @RequestParam("year") int year) {
        List<String> repairNames = comparativeReportService.getRepairNames();
        comparativeReportService.makeBlankReport(repairNames);
        comparativeReportService.makeReport(month, year);
        comparativeReportService.calculateVariations();
        return ResponseEntity.noContent().build();
    }

    // Details
    @GetMapping("/details/month/{month}/year/{year}")
    public ResponseEntity<List<DetailModel>> getDetailsByMonthAndYear(@PathVariable int month,
                                                                      @PathVariable int year) {
        List<DetailModel> reports = typeReportService.getDetailsByMonthAndYear(month, year);
        return ResponseEntity.ok(reports);
    }
}
