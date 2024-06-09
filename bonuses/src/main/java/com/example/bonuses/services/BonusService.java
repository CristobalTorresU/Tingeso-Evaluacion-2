package com.example.bonuses.services;

import com.example.bonuses.entities.BonusEntity;
import com.example.bonuses.repositories.BonusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BonusService {
    @Autowired
    BonusRepository bonusRepository;

    public ArrayList<BonusEntity> getBonuses() {
        return (ArrayList<BonusEntity>) bonusRepository.findAll();
    }

    public BonusEntity saveBonus(BonusEntity bonus) {
        if (bonusRepository.findByBrand(bonus.getBrand()) != null) {
            return null;
        }
        return bonusRepository.save(bonus);
    }

    public BonusEntity getBonusById(Long id) {
        return bonusRepository.findById(id).get();
    }

    public BonusEntity getBonusByBrand(String brand) {
        return bonusRepository.findByBrand(brand);
    }

    public BonusEntity updateBonus(BonusEntity bonus) {
        return bonusRepository.save(bonus);
    }

    public void decreaseBonus(String brand) {
        BonusEntity bonus = bonusRepository.findByBrand(brand);
        bonus.setQuantity(bonus.getQuantity() - 1);
        bonusRepository.save(bonus);
    }

    public boolean deleteBonus(Long id) throws Exception {
        try{
            bonusRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
