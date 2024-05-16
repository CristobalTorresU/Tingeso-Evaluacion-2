package com.example.repairs.models;

import lombok.Data;

@Data
public class RepairListModel {
    private String repairName;
    private int gasolineamount;
    private int dieselamount;
    private int hibridAmount;
    private int electricamount;
}
