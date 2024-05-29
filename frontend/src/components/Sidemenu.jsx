import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CarRental from "@mui/icons-material/CarRental";
import CarRepair from "@mui/icons-material/CarRepair";
import PaidIcon from "@mui/icons-material/Paid";
import CalculateIcon from "@mui/icons-material/Calculate";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import type_reportService from "../services/type_report.service";
import time_reportService from "../services/time_report.service";
import motor_reportService from "../services/motor_report.service";

export default function Sidemenu({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const generateReports = (r) => {
    r.preventDefault();
    time_reportService
      .generate()
      .then((response) => {
        console.log("Reporte de tiempo ha sido generado.", response.data);
      })
      .catch((error) => {
        console.log("Ocurrio un error al generar el reporte de tiempos.", error);
      });
    type_reportService
      .generate()
      .then((response) => {
        console.log("Reporte de tipo ha sido generado.", response.data);
      })
      .catch((error) => {
        console.log("Ocurrio un error al generar el reporte de tiempos.", error);
      });
    motor_reportService
      .generate()
      .then((response) => {
        console.log("Reporte de motor ha sido generado.", response.data);
      })
      .catch((error) => {
        console.log("Ocurrio un error al generar el reporte de tiempos.", error);
      });
    console.log("Fin generacion reporte.");
  };

  const listOptions = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={() => navigate("/vehicle/list")}>
          <ListItemIcon>
            <CarRental />
          </ListItemIcon>
          <ListItemText primary="Vehículos" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/repair/list")}>
          <ListItemIcon>
            <CarRepair />
          </ListItemIcon>
          <ListItemText primary="Reparaciones" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/bonus/list")}>
          <ListItemIcon>
            <PaidIcon />
          </ListItemIcon>
          <ListItemText primary="Bonus" />
        </ListItemButton>

      <Divider />

        <ListItemButton onClick={(r) => generateReports(r)}>
          <ListItemIcon>
            <CalculateIcon />
          </ListItemIcon>
          <ListItemText primary="Generar Reportes" />
        </ListItemButton>

      <Divider />

        <ListItemButton onClick={() => navigate("/report/typeReport")}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Reporte Por Tipo" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/report/timeReport")}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Reporte Por Tiempo" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/report/motorReport")}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Reporte Por Motor" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        {listOptions()}
      </Drawer>
    </div>
  );
}
