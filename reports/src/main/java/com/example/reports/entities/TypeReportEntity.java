package com.example.reports.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "type_report")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private String repairName;
    private int quantitySedan;
    private int quantityHatchback;
    private int quantitySUV;
    private int quantityPickup;
    private int quantityFurgoneta;
    private int totalAmountSedan;
    private int totalAmountHatchback;
    private int totalAmountSUV;
    private int totalAmountPickup;
    private int totalAmountFurgoneta;
}
