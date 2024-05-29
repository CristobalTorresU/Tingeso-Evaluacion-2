import { useState } from "react";
import { useNavigate } from "react-router-dom";
import repairService from "../services/repair.service";
import CalculateIcon from "@mui/icons-material/Calculate";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from "moment";

const RepairCalculate = () => {
  const [plate, setPlate] = useState("");
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [checkinHour, setCheckinHour] = useState(null);
  const [reparationType, setReparationType] = useState("");
  const [exitDate, setExitDate] = useState(new Date());
  const [exitHour, setExitHour] = useState(null);
  const [collectDate, setCollectDate] = useState(new Date());
  const [collectHour, setCollectHour] = useState(null);

  const navigate = useNavigate();

  const formatTime = (time) => {
    return moment(time).format('HH:mm:ss');
  };

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const calculateRepair = (r) => {
    r.preventDefault();
    console.log("Solicitar calcular reparacion.");
    repairService
      .calculate(plate, formatDate(checkinDate), formatTime(checkinHour), reparationType, formatDate(exitDate), formatTime(exitHour), formatDate(collectDate), formatTime(collectHour))
      .then((response) => {
        console.log("Reparacion ha sido actualizada.", response.data);
        navigate("/repair/list");
      })
      .catch((error) => {
        console.log(
          "Ha ocurrido un error al intentar calcular la reparacion.",
          error
        );
      });
    console.log("Fin calculo reparacion.");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
    >
      <hr />
      <h3> Calcular Reparación </h3>
      <hr />
      <form>
        <FormControl fullWidth>
          <TextField
            id="plate"
            label="Patente"
            value={plate}
            variant="standard"
            onChange={(r) => setPlate(r.target.value)}
          />
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker label="Fecha Entrada" selected={checkinDate} onChange={(checkinDate) => setCheckinDate(checkinDate)} />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimePicker label="Hora Entrada" ampm={false} value={checkinHour} onChange={setCheckinHour}/>
        </LocalizationProvider>

        <FormControl fullWidth>
          <TextField
            id="reparationType"
            label="Tipo de Reparación"
            value={reparationType}
            select
            variant="standard"
            defaultValue="1"
            onChange={(r) => setReparationType(r.target.value)}
            style={{ width: "100%" }}
          >
            <MenuItem value={1}>Reparaciones del Sistema de Frenos</MenuItem>
            <MenuItem value={2}>Servicio del Sistema de Refrigeración</MenuItem>
            <MenuItem value={3}>Reparaciones del Motor</MenuItem>
            <MenuItem value={4}>Reparaciones de la Transmisión</MenuItem>
            <MenuItem value={5}>Reparación del Sistema Eléctrico</MenuItem>
            <MenuItem value={6}>Reparaciones del Sistema de Escape</MenuItem>
            <MenuItem value={7}>Reparación de Neumáticos y Ruedas</MenuItem>
            <MenuItem value={8}>Reparaciones de la Suspensión y la Dirección</MenuItem>
            <MenuItem value={9}>Reparación del Sistema de Aire Acondicionado y Calefacción</MenuItem>
            <MenuItem value={10}>Reparaciones del Sistema de Combustible</MenuItem>
            <MenuItem value={11}>Reparación y Reemplazo del Parabrisas y Cristales</MenuItem>
          </TextField>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker label="Fecha Salida" selected={exitDate} onChange={(exitDate) => setExitDate(exitDate)} />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimePicker label="Hora Salida" ampm={false} value={exitHour} onChange={setExitHour}/>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker label="Fecha Recolección" selected={collectDate} onChange={(collectDate) => setCollectDate(collectDate)} />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimePicker label="Hora Recolección" ampm={false} value={collectHour} onChange={setCollectHour}/>
        </LocalizationProvider>

          <br />
          <br />
        <FormControl>
          <Button
            variant="contained"
            color="info"
            onClick={(r) => calculateRepair(r)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<CalculateIcon />}
          >
            Calcular Reparación
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default RepairCalculate;