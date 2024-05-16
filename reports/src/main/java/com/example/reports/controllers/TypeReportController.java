package com.example.reports.controllers;

import com.example.reports.entities.TypeReportEntity;
import com.example.reports.services.TypeReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/typereports")
@CrossOrigin("*")
public class TypeReportController {
    @Autowired
    TypeReportService typeReportService;

    @GetMapping("/")
    public ResponseEntity<List<TypeReportEntity>> listTypeReports() {
        List<TypeReportEntity> typeReports = typeReportService.getTypeReports();
        return ResponseEntity.ok(typeReports);
    }

    /*
    @GetMapping("/generate")
    public ResponseEntity<List<TypeReportEntity>> bringTypeReports() {
        typeReportService.makeBlankReport();
        List<TypeReportEntity> reports = typeReportService.makeReport();
        return ResponseEntity.ok(reports);
    }
    */

    @GetMapping("/ordered")
    public ResponseEntity<List<TypeReportEntity>> orderedTypeReports() {
        List<TypeReportEntity> reports = typeReportService.getTypeOrdered();
        return ResponseEntity.ok(reports);
    }
}
