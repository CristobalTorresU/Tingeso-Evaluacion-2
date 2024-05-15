package com.example.repairs.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "repair")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepairEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long repair_id;

    private LocalDate checkinDate;
    private LocalTime checkinHour;
    private int reparationType;
    private int totalAmount;
    private int rechargesAmount;
    private int discountsAmount;
    private int iva;
    private LocalDate exitDate;
    private LocalTime exitHour;
    private LocalDate collectDate;
    private LocalTime collectHour;
}
