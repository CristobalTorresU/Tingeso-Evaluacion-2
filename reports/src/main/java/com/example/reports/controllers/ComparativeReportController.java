package com.example.reports.controllers;

import com.example.reports.entities.ComparativeReportEntity;
import com.example.reports.services.ComparativeReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/comparativereports")
@CrossOrigin("*")
public class ComparativeReportController {
    @Autowired
    ComparativeReportService comparativeReportService;

    @GetMapping("/")
    public ResponseEntity<List<ComparativeReportEntity>> listComparativeReports() {
        List<ComparativeReportEntity> comparativeReports = comparativeReportService.getComparativeReports();
        return ResponseEntity.ok(comparativeReports);
    }
}
