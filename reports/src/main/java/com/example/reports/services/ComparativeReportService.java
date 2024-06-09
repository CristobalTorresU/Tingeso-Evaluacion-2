package com.example.reports.services;

import com.example.reports.entities.ComparativeReportEntity;
import com.example.reports.models.DetailModel;
import com.example.reports.repositories.ComparativeReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Service
public class ComparativeReportService {
    @Autowired
    ComparativeReportRepository comparativeReportRepository;
    @Autowired
    RestTemplate restTemplate;

    public ArrayList<ComparativeReportEntity> getComparativeReports() {
        return comparativeReportRepository.getAll();
    }

    public void makeBlankReport(List<String> repairs, int month, int year) {
        // Se eliminan todos los registros de la tabla.
        comparativeReportRepository.deleteAll();

        // Se crean los nuevos registros en blanco en la tabla.
        for (int i = 0 ; i < repairs.size() ; i++) {
            ComparativeReportEntity report = new ComparativeReportEntity();
            report.setMonth(month);
            report.setYear(year);
            report.setRepair(repairs.get(i));
            report.setQuantityNow(0);
            report.setQuantity1(0);
            report.setQuantity2(0);
            report.setAmountNow(0);
            report.setAmount1(0);
            report.setAmount2(0);
            report.setVariationQ1(0);
            report.setVariationQ2(0);
            report.setVariationA1(0);
            report.setVariationA2(0);

            comparativeReportRepository.save(report);
        }
    }

    public void makeReport(int month, int year) {
        List<DetailModel> detailsNow = getDetailsByMonthAndYear(month, year);

        YearMonth previousMonth = YearMonth.of(year, month).minusMonths(1);
        int year1before = previousMonth.getYear();
        int month1before = previousMonth.getMonthValue();
        List<DetailModel> details1month = getDetailsByMonthAndYear(month1before, year1before);

        YearMonth previous2Month = YearMonth.of(year, month).minusMonths(2);
        int year2before = previous2Month.getYear();
        int month2before = previous2Month.getMonthValue();
        List<DetailModel> details2month = getDetailsByMonthAndYear(month2before, year2before);

        for (int i = 0 ; i < detailsNow.size() ; i++) {
            // Busca el reporte con la reparacion indicada.
            ComparativeReportEntity report = comparativeReportRepository.findByRepair(detailsNow.get(i).getRepairType());
            // Se suma el monto por cada detalle
            report.setAmountNow(report.getAmountNow() + detailsNow.get(i).getAmount());
            // Se suma la cantidad por cada detalle.
            report.setQuantityNow(report.getQuantityNow() + 1);
        }

        for (int i = 0 ; i < details1month.size() ; i++) {
            ComparativeReportEntity report = comparativeReportRepository.findByRepair(details1month.get(i).getRepairType());
            report.setAmount1(report.getAmount1() + details1month.get(i).getAmount());
            report.setQuantity1(report.getQuantity1() + 1);
        }

        for (int i = 0 ; i < details2month.size() ; i++) {
            ComparativeReportEntity report = comparativeReportRepository.findByRepair(details2month.get(i).getRepairType());
            report.setAmount2(report.getAmount2() + details2month.get(i).getAmount());
            report.setQuantity2(report.getQuantity2() + 1);
        }
    }

    public void calculateVariations() {
        List<ComparativeReportEntity> reports = getComparativeReports();
        for (int i = 0 ; i < reports.size() ; i++) {
            ComparativeReportEntity report = reports.get(i);
            report.setVariationQ1(equation(report.getQuantityNow(), report.getQuantity1()));
            report.setVariationQ2(equation(report.getQuantityNow(), report.getQuantity2()));
            report.setVariationA1(equation(report.getAmountNow(), report.getAmount1()));
            report.setVariationA2(equation(report.getAmountNow(), report.getAmount2()));

            comparativeReportRepository.save(report);
        }
    }

    public int equation(int qaNow , int qa) {
        if (qa == 0 && qaNow == 0) {
            return 0;
        } else if (qa == 0) {
            return 100;
        } else {
            return ((qaNow * 100) / qa) - 100;
        }
    }

    public List<DetailModel> getDetailsByMonthAndYear(int month, int year) {
        ParameterizedTypeReference<List<DetailModel>> responseType = new ParameterizedTypeReference<List<DetailModel>>() {};
        return restTemplate.exchange("http://repairs/api/details/month/" + month + "/year/" + year, HttpMethod.GET, null, responseType).getBody();
    }

    public List<String> getRepairNames() {
        ParameterizedTypeReference<List<String>> responseType = new ParameterizedTypeReference<List<String>>() {};
        return restTemplate.exchange("http://repairs/api/details/repair-list/list", HttpMethod.GET, null, responseType).getBody();
    }
}
