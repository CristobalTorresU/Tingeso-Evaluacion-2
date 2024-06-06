package com.example.repairs.services;

import com.example.repairs.entities.DetailEntity;
import com.example.repairs.entities.RepairEntity;
import com.example.repairs.models.BonusModel;
import com.example.repairs.models.RepairListModel;
import com.example.repairs.models.VehicleModel;
import com.example.repairs.repositories.RepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class RepairService {
    @Autowired
    RepairRepository repairRepository;
    @Autowired
    DetailService detailService;
    @Autowired
    CalculateService calculateService;
    @Autowired
    RestTemplate restTemplate;

    public ArrayList<RepairEntity> getRepairs() {
        return (ArrayList<RepairEntity>) repairRepository.findAll();
    }

    public RepairEntity getRepairById(Long id) {
        return repairRepository.findById(id).get();
    }

    public RepairEntity saveRepair(RepairEntity repair) {
        return repairRepository.save(repair);
    }

    public boolean deleteRepair(Long id) throws Exception {
        try{
            repairRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public VehicleModel getVehicleByRepairId(Long id) {
        List<DetailEntity> details = detailService.getDetailsByRepairId(id);
        String plate = details.get(0).getPlate();
        return detailService.getVehicle(plate);
    }

    public BonusModel getBonus(String brand) {
        return restTemplate.getForObject("http://bonuses/api/bonuses/by-brand/" + brand, BonusModel.class);
    }

    public RepairListModel getRepairList(String repair) {
        return restTemplate.getForObject("http://repairs-list/api/repair-list/by-repair/" + repair, RepairListModel.class);
    }

    // Multiple Repairs Version
    public boolean calculateMultipleTotalAmount(String plate,
                                               String checkinDateString,
                                               String checkinHourString,
                                               List<String> repairNames,
                                               String exitDateString,
                                               String exitHourString,
                                               String collectDateString,
                                               String collectHourString) {
        // Formatear Fechas
        LocalDate checkinDate = LocalDate.parse(checkinDateString);
        LocalDate exitDate = LocalDate.parse(exitDateString);
        LocalDate collectDate = LocalDate.parse(collectDateString);

        // Formatear Horas
        LocalTime checkinHour = LocalTime.parse(checkinHourString);
        LocalTime exitHour = LocalTime.parse(exitHourString);
        LocalTime collectHour = LocalTime.parse(collectHourString);

        double reparations = 0.0;

        VehicleModel vehicle = detailService.getVehicle(plate);
        BonusModel bonuses = getBonus(vehicle.getBrand());

        RepairEntity repair = new RepairEntity();

        // Se calcula el precio de cada reparacion y se obtiene el total.
        for (int i = 0 ; i < repairNames.size() ; i++) {
            RepairListModel repairList = getRepairList(repairNames.get(i));
            reparations += calculateService.getReparationTypePrice(vehicle.getMotor(), repairList);
        }

        // Se realizan los calculos para cada uno de los descuentos, recargos e IVA.
        double mileageRecharges = reparations * calculateService.getMileageRecharge(vehicle.getType(), vehicle.getMileage());
        double yearRecharge = reparations * calculateService.getYearRecharge(vehicle.getType(), vehicle.getYear(), checkinDate);
        double lateRecharge = reparations * calculateService.getLateRecharge(exitDate, collectDate);
        double reparationDiscounts = reparations * calculateService.getReparationsDiscount(vehicle.getMotor(),
                detailService.getDetailsByPlate(plate).size());
        double dayDiscount = reparations * calculateService.getDayDiscount(checkinDate, checkinHour);
        double bonusDiscount = calculateService.getBonusDiscount(bonuses);

        int discounts = (int)reparationDiscounts + (int)dayDiscount + (int)bonusDiscount;
        int recharges = (int)mileageRecharges + (int)yearRecharge + (int)lateRecharge;
        int iva = (int)(reparations * 0.19);

        int totalPrice = ((int)reparations + recharges - discounts) + iva;

        // Atributos para la reparacion
        repair.setCheckinDate(checkinDate);
        repair.setCheckinHour(checkinHour);
        repair.setExitDate(exitDate);
        repair.setExitHour(exitHour);
        repair.setCollectDate(collectDate);
        repair.setCollectHour(collectHour);
        repair.setTotalAmount(totalPrice);
        repair.setIva(iva);
        repair.setRepairsAmount((int)reparations);
        repair.setDiscountsAmount(discounts);
        repair.setRechargesAmount(recharges);

        repairRepository.save(repair);

        // Atributos para cada detalle
        for (int i = 0 ; i < repairNames.size() ; i++) {
            DetailEntity detail = new DetailEntity();
            detail.setPlate(plate);
            detail.setRepairType(repairNames.get(i));
            detail.setDate(checkinDate);
            detail.setHour(checkinHour);
            detail.setRepair_id(repair.getId());
            RepairListModel repairList = getRepairList(repairNames.get(i));
            detail.setAmount((int)calculateService.getReparationTypePrice(vehicle.getMotor(), repairList));
            detailService.saveDetail(detail);
        }

        return true;
    }
}
