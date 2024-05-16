package com.example.reports.services;

import com.example.reports.entities.ComparativeReportEntity;
import com.example.reports.repositories.ComparativeReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ComparativeReportService {
    @Autowired
    ComparativeReportRepository comparativeReportRepository;

    public ArrayList<ComparativeReportEntity> getComparativeReports() {
        return (ArrayList<ComparativeReportEntity>) comparativeReportRepository.findAll();
    }

    public void makeBlankReport() {
        comparativeReportRepository.deleteAll();
    }
}
