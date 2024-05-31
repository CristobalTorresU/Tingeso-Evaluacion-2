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
        return (ArrayList<ComparativeReportEntity>) comparativeReportRepository.findAll();
    }

    public void makeBlankReport(List<String> repairs) {
        // Se eliminan todos los registros de la tabla.
        comparativeReportRepository.deleteAll();

        // Se crean los nuevos registros en blanco en la tabla.
        for (int i = 0 ; i < repairs.size() ; i++) {
            ComparativeReportEntity report = new ComparativeReportEntity();
            report.setRepair(repairs.get(i));
            report.setQuantity1(0);
            report.setQuantity2(0);
            report.setQuantity3(0);
            report.setAmount1(0);
            report.setAmount2(0);
            report.setAmount3(0);
            report.setVariationQ1(0);
            report.setVariationQ2(0);
            report.setVariationQ3(0);
            report.setVariationA1(0);
            report.setVariationA2(0);
            report.setVariationA3(0);

            comparativeReportRepository.save(report);
        }
    }

    public void makeReport(int month, int year) {
        List<DetailModel> detailsNow = getDetailsByMonthAndYear(month, year);

        YearMonth previousMonth = YearMonth.of(year, month).minusMonths(1);
        year = previousMonth.getYear();
        month = previousMonth.getMonthValue();
        List<DetailModel> details1month = getDetailsByMonthAndYear(month, year);

        YearMonth previous2Month = YearMonth.of(year, month).minusMonths(2);
        year = previous2Month.getYear();
        month = previous2Month.getMonthValue();
        List<DetailModel> details2month = getDetailsByMonthAndYear(month, year);

        YearMonth previous3Month = YearMonth.of(year, month).minusMonths(3);
        year = previous3Month.getYear();
        month = previous3Month.getMonthValue();
        List<DetailModel> details3month = getDetailsByMonthAndYear(month, year);

        for (int i = 0 ; i < detailsNow.size() ; i++) {
            ComparativeReportEntity report = comparativeReportRepository.findByRepair(detailsNow.get(i).getRepairType());
            report.setAmountNow(report.getAmountNow() + detailsNow.get(i).getAmount());
            report.setQuantityNow(report.getQuantityNow() + 1);
            // TODO: MEDIDA PARCHE
            report.setYear(year);
            report.setMonth(month);
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

        for (int i = 0 ; i < details3month.size() ; i++) {
            ComparativeReportEntity report = comparativeReportRepository.findByRepair(details3month.get(i).getRepairType());
            report.setAmount3(report.getAmount3() + details3month.get(i).getAmount());
            report.setQuantity3(report.getQuantity3() + 1);
        }
    }

    // TODO: Probar con 5 meses de reparaciones.
    public void calculateVariations() {
        List<ComparativeReportEntity> reports = getComparativeReports();
        for (int i = 0 ; i < reports.size() ; i++) {
            ComparativeReportEntity report = reports.get(i);
            report.setVariationQ1(equation(report.getQuantityNow(), report.getQuantity1()));
            report.setVariationQ2(equation(report.getQuantityNow(), report.getQuantity2()));
            report.setVariationQ3(equation(report.getQuantityNow(), report.getQuantity3()));
            report.setVariationA1(equation(report.getAmountNow(), report.getAmount1()));
            report.setVariationA2(equation(report.getAmountNow(), report.getAmount2()));
            report.setVariationA3(equation(report.getAmountNow(), report.getAmount3()));

            comparativeReportRepository.save(report);
        }
    }

    public int equation(int qa , int qaNow) {
        if (qaNow == 0) {
            return qa * 100;
        }
        return (qa * 100) / qaNow;
    }

    public List<DetailModel> getDetailsByMonthAndYear(int month, int year) {
        ParameterizedTypeReference<List<DetailModel>> responseType = new ParameterizedTypeReference<List<DetailModel>>() {};
        return restTemplate.exchange("http://repairs/api/repairs/details/month/" + month + "/year/" + year, HttpMethod.GET, null, responseType).getBody();
    }

    public List<String> getRepairNames() {
        ParameterizedTypeReference<List<String>> responseType = new ParameterizedTypeReference<List<String>>() {};
        return restTemplate.exchange("http://repairs/api/details/repair-list/list", HttpMethod.GET, null, responseType).getBody();
    }
}
