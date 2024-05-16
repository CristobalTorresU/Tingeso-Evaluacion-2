package com.example.repairs.models;

import lombok.Data;

@Data
public class TypeReportModel {
    private int reparationType;
    private String repairName;
    private int quantity;
    private String type;
    private int totalAmount;
}
