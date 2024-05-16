package com.example.reports.models;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class RepairModel {
    private LocalDate checkinDate;
    private LocalTime checkinHour;
    private int totalAmount;
    private int rechargesAmount;
    private int discountsAmount;
    private int iva;
    private LocalDate exitDate;
    private LocalTime exitHour;
    private LocalDate collectDate;
    private LocalTime collectHour;
}
