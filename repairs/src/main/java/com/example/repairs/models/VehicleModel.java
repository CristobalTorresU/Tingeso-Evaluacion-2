package com.example.repairs.models;

import lombok.Data;

@Data
public class VehicleModel {
    private String plate;
    private String brand;
    private int mileage;
    private String model;
    private String type;
    private int year;
    private String motor;
    private int seats;
}
