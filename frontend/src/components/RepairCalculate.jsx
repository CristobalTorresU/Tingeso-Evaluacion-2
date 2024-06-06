import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import repairService from "../services/repair.service";
import repair_listService from "../services/repair_list.service";
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
  const [reparationTypes, setReparationTypes] = useState([]);
  const [exitDate, setExitDate] = useState(new Date());
  const [exitHour, setExitHour] = useState(null);
  const [collectDate, setCollectDate] = useState(new Date());
  const [collectHour, setCollectHour] = useState(null);
  const [repairNames, setRepairNames] = useState([]); // Estado para los nombres de reparaciones
  const [selectedReparationType, setSelectedReparationType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los nombres de reparaciones de la base de datos
    const fetchRepairNames = async () => {
      try {
        const response = await repair_listService.getNames(); // Ajusta esto a tu servicio
        setRepairNames(response.data);
      } catch (error) {
        console.error("Error al obtener los nombres de reparaciones:", error);
      }
    };

    fetchRepairNames();
  }, []);

  const formatTime = (time) => {
    return moment(time).format('HH:mm:ss');
  };

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const addReparationType = (type) => {
    setReparationTypes([...reparationTypes, type]);
  };

  const removeReparationType = (type) => {
    setReparationTypes(reparationTypes.filter(t => t !== type));
  };

  const calculateRepair = (r) => {
    r.preventDefault();
    console.log("Solicitar calcular reparacion.");
    repairService
      .calculate(plate, formatDate(checkinDate), formatTime(checkinHour), reparationTypes, formatDate(exitDate), formatTime(exitHour), formatDate(collectDate), formatTime(collectHour))
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

        <div>
        <label>Reparaciones:</label>
        {reparationTypes.map((type, index) => (
          <span key={index}>{type} <button type="button" onClick={() => removeReparationType(type)}>Remove</button></span>
        ))}
        <FormControl fullWidth>
          <TextField
            id="reparationType"
            label="Tipo de Reparación"
            value={selectedReparationType}
            select
            variant="standard"
            onChange={(r) => {
              setSelectedReparationType(r.target.value);
              addReparationType(r.target.value);
            }}
            style={{ width: "100%" }}
          >
            {repairNames.map((name, index) => (
              <MenuItem key={index} value={name}>{name}</MenuItem>
            ))}
          </TextField>
        </FormControl>
      </div>

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