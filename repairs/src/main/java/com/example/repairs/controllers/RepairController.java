package com.example.repairs.controllers;

import com.example.repairs.services.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/repairs")
@CrossOrigin("*")
public class RepairController {
    @Autowired
    RepairService repairService;
}
