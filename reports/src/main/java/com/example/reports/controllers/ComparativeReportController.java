package com.example.reports.controllers;

import com.example.reports.entities.ComparativeReportEntity;
import com.example.reports.services.ComparativeReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comparative-reports")
public class ComparativeReportController {
    @Autowired
    ComparativeReportService comparativeReportService;

    @GetMapping("/")
    public ResponseEntity<List<ComparativeReportEntity>> listComparativeReports() {
        List<ComparativeReportEntity> comparativeReports = comparativeReportService.getComparativeReports();
        return ResponseEntity.ok(comparativeReports);
    }

    @GetMapping("/generate")
    public ResponseEntity<Void> bringComparativeReports(@RequestParam("month") int month, @RequestParam("year") int year) {
        List<String> repairNames = comparativeReportService.getRepairNames();
        comparativeReportService.makeBlankReport(repairNames);
        comparativeReportService.makeReport(month, year);
        comparativeReportService.calculateVariations();
        return ResponseEntity.noContent().build();
    }
}
