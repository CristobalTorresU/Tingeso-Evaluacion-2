import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import repairService from "../services/repair.service";
import repair_listService from "../services/repair_list.service";
import CalculateIcon from "@mui/icons-material/Calculate";
import DeleteIcon from "@mui/icons-material/Delete";
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

const RepairCalculateWithoutDates = () => {
  const [plate, setPlate] = useState("");
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [checkinHour, setCheckinHour] = useState(null);
  const [repair, setRepair] = useState([]);
  const [repairNames, setRepairNames] = useState([]); // Estado para los nombres de reparaciones
  const [selectedRepair, setSelectedRepair] = useState("");

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

  const addRepair = (type) => {
    setRepair([...repair, type]);
  };

  const removeRepair = (type) => {
    setRepair(repair.filter(t => t !== type));
  };

  const toIdList = async (repair) => {
    try {
      let idList = "";
      for(const element of repair) {
        const repairList = await repair_listService.getByName(element);
        const idOfRepair = repairList.data.id;
        idList = idList + idOfRepair + ',';
      }
      return idList.slice(0, -1);
    } catch (error) {
      console.error('Error al obtener los IDs: ', error);
      throw error;
    }
  };

  const calculateRepair = async (r) => {
    r.preventDefault();
    console.log("Solicitar calcular reparacion.");
    try {
      const idList = await toIdList(repair)

      repairService
        .calculateCheckin(plate, formatDate(checkinDate), formatTime(checkinHour), idList)
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
    } catch (error) {
      console.log('Error al obtener la lista de IDs de reparación:', error);
    }
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
        {repair.map((type, index) => (
          <span key={index}>{type} <Button 
          variant="contained"
          color="error"
          onClick={() => removeRepair(type)}
          style={{ marginRight: "0.5rem"}}
          startIcon={<DeleteIcon />}>
          </Button></span>
        ))}
        <FormControl fullWidth>
          <TextField
            id="reparationType"
            label="Tipo de Reparación"
            value={selectedRepair}
            select
            variant="standard"
            onChange={(r) => {
              setSelectedRepair(r.target.value);
              addRepair(r.target.value);
            }}
            style={{ width: "100%" }}
          >
            {repairNames.map((name, index) => (
              <MenuItem key={index} value={name}>{name}</MenuItem>
            ))}
          </TextField>
        </FormControl>
      </div>

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

export default RepairCalculateWithoutDates;