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
import java.util.Map;

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

    public RepairListModel getRepairListById(int id) {
        String idAsString = Integer.toString(id);
        return restTemplate.getForObject("http://repairs-list/api/repair-list/" + idAsString, RepairListModel.class);
    }

    public List<Map<String, Object>> combineRepairsAndVehicles() {
        List<RepairEntity> repairs = getRepairs();
        return repairs.stream().map(repair -> {
            VehicleModel vehicle = getVehicleByRepairId(repair.getId());
            return Map.of(
                    "repair", repair,
                    "vehicle", vehicle
            );
        }).collect(java.util.stream.Collectors.toList());
    }

    public boolean registerRepairAndCheckin(String plate,
                                            String checkinDateString,
                                            String checkinHourString,
                                            List<Integer> repairsId) {
        LocalDate checkinDate = LocalDate.parse(checkinDateString);
        LocalTime checkinHour = LocalTime.parse(checkinHourString);

        double reparations = 0.0;

        VehicleModel vehicle = detailService.getVehicle(plate);
        BonusModel bonuses = getBonus(vehicle.getBrand());

        RepairEntity repair = new RepairEntity();

        // Se calcula el precio de cada reparacion y se obtiene el total.
        for (int i = 0 ; i < repairsId.size() ; i++) {
            RepairListModel repairList = getRepairListById(repairsId.get(i));
            reparations += calculateService.getReparationTypePrice(vehicle.getMotor(), repairList);
        }

        // Se realizan los calculos para cada uno de los descuentos, recargos e IVA.
        double mileageRecharges = reparations * calculateService.getMileageRecharge(vehicle.getType(), vehicle.getMileage());
        double yearRecharge = reparations * calculateService.getYearRecharge(vehicle.getType(), vehicle.getYear(), checkinDate);
        double reparationDiscounts = reparations * calculateService.getReparationsDiscount(vehicle.getMotor(),
                detailService.getDetailsByPlate(plate).size());
        double dayDiscount = reparations * calculateService.getDayDiscount(checkinDate, checkinHour);
        double bonusDiscount = calculateService.getBonusDiscount(bonuses);

        int discounts = (int)reparationDiscounts + (int)dayDiscount + (int)bonusDiscount;
        int recharges = (int)mileageRecharges + (int)yearRecharge;

        repair.setCheckinDate(checkinDate);
        repair.setCheckinHour(checkinHour);
        repair.setRepairsAmount((int)reparations);
        repair.setDiscountsAmount(discounts);
        repair.setRechargesAmount(recharges);

        repairRepository.save(repair);

        // Atributos para cada detalle
        for (int i = 0 ; i < repairsId.size() ; i++) {
            DetailEntity detail = new DetailEntity();
            detail.setPlate(plate);
            detail.setRepairType(getRepairListById(repairsId.get(i)).getRepairName());
            detail.setDate(checkinDate);
            detail.setHour(checkinHour);
            detail.setRepair_id(repair.getId());
            RepairListModel repairList = getRepairListById(repairsId.get(i));
            detail.setAmount((int)calculateService.getReparationTypePrice(vehicle.getMotor(), repairList));
            detailService.saveDetail(detail);
        }

        return true;
    }

    public boolean updateRepairAndExit(Long id,
                                       String exitDateString,
                                       String exitHourString) {
        RepairEntity repair = getRepairById(id);
        LocalDate exitDate = LocalDate.parse(exitDateString);
        LocalTime exitHour = LocalTime.parse(exitHourString);

        repair.setExitDate(exitDate);
        repair.setExitHour(exitHour);

        repairRepository.save(repair);

        return true;
    }

    public boolean updateRepairAndCollect(Long id,
                                          String collectDateString,
                                          String collectHourString) {
        RepairEntity repair = getRepairById(id);
        LocalDate collectDate = LocalDate.parse(collectDateString);
        LocalTime collectHour = LocalTime.parse(collectHourString);

        double reparations = repair.getRepairsAmount();
        int discounts = repair.getDiscountsAmount();
        int recharges = repair.getRechargesAmount();

        double lateRecharge = reparations * calculateService.getLateRecharge(repair.getExitDate(), collectDate);
        int lateRechargeInt = (int)lateRecharge;
        double iva = reparations * 0.19;

        int totalPrice = ((int)reparations + (recharges + lateRechargeInt) - discounts) + (int)iva;

        repair.setCollectDate(collectDate);
        repair.setCollectHour(collectHour);
        repair.setRechargesAmount(recharges + lateRechargeInt);
        repair.setIva((int)iva);
        repair.setTotalAmount(totalPrice);

        repairRepository.save(repair);

        return true;
    }
}
