package com.example.reports.models;

import lombok.Data;

@Data
public class DetailModel {
    private String plate;
    private String repairType;
    private String date;
    private String hour;
    private int amount;
    private Long repair_id;
}
