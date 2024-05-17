package com.example.repairs.controllers;

import com.example.repairs.entities.DetailEntity;
import com.example.repairs.services.DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/details")
@CrossOrigin("*")
public class DetailController {
    @Autowired
    DetailService detailService;

    @GetMapping("/")
    public ResponseEntity<List<DetailEntity>> listDetails() {
        List<DetailEntity> details = detailService.getDetails();
        return ResponseEntity.ok(details);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<DetailEntity>> getDetailById(@PathVariable Long id) {
        List<DetailEntity> detail = detailService.getRepairById(id);
        return ResponseEntity.ok(detail);
    }
}
