package com.example.repairslist.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "repair_list")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RepairListEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private String repairName;
    private int gasolineamount;
    private int dieselamount;
    private int hibridAmount;
    private int electricamount;
}
