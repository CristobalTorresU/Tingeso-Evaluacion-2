import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const RepairCalculateExit = () => {
  const [enterDate, setEnterDate] = useState(new Date());
  const [enterHour, setEnterHour] = useState(null);
  const [exitDate, setExitDate] = useState(null);
  const { id } = useParams();
  const [titleRepairForm, setTitleRepairForm] = useState("");

  const navigate = useNavigate();

  const formatTime = (time) => {
    return moment(time).format('HH:mm:ss');
  };

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const forExit = (r) => {
    r.preventDefault();
    console.log("Solicitar calcular reparacion.");
      repairService
        .calculateExit(id, formatDate(enterDate), formatTime(enterHour))
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

  const forCollect = (r) => {
    r.preventDefault();
    console.log("Solicitar calcular reparacion.");
    try {
      repairService
        .calculateCollect(id, formatDate(enterDate), formatTime(enterHour))
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

  const decision = (r) => {
    r.preventDefault();
    if (!exitDate) {
      forExit(r);
    } else {
      forCollect(r);
    }
  }

  useEffect(() => {
    // Cargar datos de la reparación
    repairService.get(id)
      .then((response) => {
        const repair = response.data;
        setExitDate(repair.exitDate); // Asignar el valor de exitDate
        if (!repair.exitDate) {
          setTitleRepairForm("Ingresar Datos de Salida del Taller");
        } else {
          setTitleRepairForm("Ingresar Datos de Retiro del Cliente");
        }
      })
      .catch((error) => {
        console.log("Error al cargar los datos de la reparación:", error);
      });
  }, [id]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
    >
      <hr />
      <h3> {titleRepairForm} </h3>
      <hr />
      <form>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker label="Fecha" selected={enterDate} onChange={(enterDate) => setEnterDate(enterDate)} />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimePicker label="Hora" ampm={false} value={enterHour} onChange={setEnterHour}/>
        </LocalizationProvider>

        <br />
        <br />
        <FormControl>
          <Button
            variant="contained"
            color="info"
            onClick={(r) => decision(r)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<CalculateIcon />}
          >
            Ingresar Hora y Fecha
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default RepairCalculateExit;