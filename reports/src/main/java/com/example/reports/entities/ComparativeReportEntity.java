package com.example.reports.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private int quantity;
    private int amount;
    private String repair;
    private int variation;
}
