package com.example.repairs.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "detail")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private String plate;
    private String repairType;
    private LocalDate date;
    private LocalTime hour;
    private int amount;
    private Long repair_id;
}
