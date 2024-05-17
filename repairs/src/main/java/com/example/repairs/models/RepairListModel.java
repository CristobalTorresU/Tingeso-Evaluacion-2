package com.example.repairs.models;

import lombok.Data;

@Data
public class RepairListModel {
    private String repairName;
    private int gasolineAmount;
    private int dieselAmount;
    private int hibridAmount;
    private int electricAmount;
}
