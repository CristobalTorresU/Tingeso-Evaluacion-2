package com.example.reports.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "comparative_report")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComparativeReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private int quantityNow;
    private int quantity1;
    private int quantity2;
    private int quantity3;
    private int amountNow;
    private int amount1;
    private int amount2;
    private int amount3;
    private int variationQ1;
    private int variationQ2;
    private int variationQ3;
    private int variationA1;
    private int variationA2;
    private int variationA3;
    private String repair;
    private int year;
    private int month;
}
