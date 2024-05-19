package com.example.repairs.services;

import com.example.repairs.models.BonusModel;
import com.example.repairs.models.RepairListModel;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class CalculateService {
    public double getReparationTypePrice(String motor, RepairListModel repairList) {
        double price = 0.0;

        switch (motor) {
            case "Gasolina":
                price = repairList.getGasolineAmount();
                break;
            case "Diésel":
                price = repairList.getDieselAmount();
                break;
            case "Híbrido":
                price = repairList.getHibridAmount();
                break;
            case "Eléctrico":
                price = repairList.getElectricAmount();
                break;
        }

        return price;
    }

    public double getBonusDiscount(BonusModel bonuses) {
        double bonusDiscount = 0.0;
        if (bonuses != null) {
            // TODO: Mandar un put para hacer que disminuya en 1 unidad la cantidad de bonos.
            if (bonuses.getQuantity() > 0) {
                bonusDiscount = bonuses.getAmount();
                bonuses.setQuantity(bonuses.getQuantity() - 1);
            }
        }

        return bonusDiscount;
    }

    public double getReparationsDiscount(String motor, int totalRepairs) {
        double repairsDiscount = 0.0;

        // Se verifica si el vehículo no tiene reparaciones.
        if (totalRepairs == 0) {
            return repairsDiscount;
        }

        // Realizar los descuentos
        switch (motor) {
            case "Gasolina":
                if (totalRepairs <= 2) {
                    repairsDiscount = 0.05;
                } else if (totalRepairs <= 5) {
                    repairsDiscount = 0.10;
                } else if (totalRepairs <= 9) {
                    repairsDiscount = 0.15;
                } else {
                    repairsDiscount = 0.20;
                }
                break;
            case "Diésel":
                if (totalRepairs <= 2) {
                    repairsDiscount = 0.07;
                } else if (totalRepairs <= 5) {
                    repairsDiscount = 0.12;
                } else if (totalRepairs <= 9) {
                    repairsDiscount = 0.17;
                } else {
                    repairsDiscount = 0.22;
                }
                break;
            case "Híbrido":
                if (totalRepairs <= 2) {
                    repairsDiscount = 0.10;
                } else if (totalRepairs <= 5) {
                    repairsDiscount = 0.15;
                } else if (totalRepairs <= 9) {
                    repairsDiscount = 0.20;
                } else {
                    repairsDiscount = 0.25;
                }
                break;
            case "Eléctrico":
                if (totalRepairs <= 2) {
                    repairsDiscount = 0.08;
                } else if (totalRepairs <= 5) {
                    repairsDiscount = 0.13;
                } else if (totalRepairs <= 9) {
                    repairsDiscount = 0.18;
                } else {
                    repairsDiscount = 0.23;
                }
                break;
        }
        return repairsDiscount;
    }

    public double getMileageRecharge(String type, int mileage) {
        double mileageRecharge = 0.0;

        switch (type) {
            case "Sedán":
            case "Hatchback":
                if (mileage <= 5000) {
                    return mileageRecharge;
                } else if (mileage <= 12000) {
                    mileageRecharge = 0.03;
                } else if (mileage <= 25000) {
                    mileageRecharge = 0.07;
                } else if (mileage <= 40000) {
                    mileageRecharge = 0.12;
                } else {
                    mileageRecharge = 0.20;
                }
                break;
            case "SUV":
            case "Pickup":
            case "Furgoneta":
                if (mileage <= 5000) {
                    return mileageRecharge;
                } else if (mileage <= 12000) {
                    mileageRecharge = 0.05;
                } else if (mileage <= 25000) {
                    mileageRecharge = 0.09;
                } else if (mileage <= 40000) {
                    mileageRecharge = 0.12;
                } else {
                    mileageRecharge = 0.20;
                }
                break;
        }

        return mileageRecharge;
    }

    public double getYearRecharge(String type, int year, LocalDate checkinDate) {
        double yearRecharge = 0.0;
        int checkinYear = checkinDate.getYear();

        int vehicleAge = checkinYear - year;

        switch (type) {
            case "Sedán":
            case "Hatchback":
                if (vehicleAge <= 5) {
                    return yearRecharge;
                } else if (vehicleAge <= 10) {
                    yearRecharge = 0.05;
                } else if (vehicleAge <= 15) {
                    yearRecharge = 0.09;
                } else {
                    yearRecharge = 0.15;
                }
                break;
            case "SUV":
            case "Pickup":
            case "Furgoneta":
                if (vehicleAge <= 5) {
                    return yearRecharge;
                } else if (vehicleAge <= 10) {
                    yearRecharge = 0.07;
                } else if (vehicleAge <= 15) {
                    yearRecharge = 0.11;
                } else {
                    yearRecharge = 0.20;
                }
                break;
        }

        return yearRecharge;
    }

    public double getDayDiscount(LocalDate checkinDate, LocalTime checkinHour) {
        double dayDiscount = 0.0;
        DayOfWeek dayOfWeek = checkinDate.getDayOfWeek();

        if (checkinHour.isAfter(LocalTime.of(9,0)) &&
                checkinHour.isBefore(LocalTime.of(12,0))) {
            if (dayOfWeek == DayOfWeek.MONDAY || dayOfWeek == DayOfWeek.TUESDAY ||
                    dayOfWeek == DayOfWeek.WEDNESDAY || dayOfWeek == DayOfWeek.THURSDAY) {
                dayDiscount = 0.10;
            }
        }

        return dayDiscount;
    }

    public double getLateRecharge(LocalDate exitDate, LocalDate collectDate) {
        double lateRecharge = 0.0;
        int daysLate = exitDate.until(collectDate).getDays();
        if (daysLate != 0) {
            lateRecharge = 0.05 * daysLate;
        }

        return lateRecharge;
    }
}
