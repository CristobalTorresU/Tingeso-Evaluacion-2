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

    private int reparationType;
    private String repairName;
    private int quantity;
    private String type;
    private int totalAmount;
}
