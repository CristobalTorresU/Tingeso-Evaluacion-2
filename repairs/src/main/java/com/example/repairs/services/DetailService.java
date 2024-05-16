package com.example.repairs.services;

import com.example.repairs.entities.DetailEntity;
import com.example.repairs.repositories.DetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class DetailService {
    @Autowired
    DetailRepository detailRepository;

    public ArrayList<DetailEntity> getDetails() {
        return (ArrayList<DetailEntity>) detailRepository.findAll();
    }

    public DetailEntity saveDetail(DetailEntity detail) {
        return detailRepository.save(detail);
    }

    public DetailEntity getDetailById(Long id) {
        return detailRepository.findById(id).get();
    }
}
