import { useState } from "react";
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

const RepairCalculate = () => {
  const [plate, setPlate] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkinHour, setCheckinHour] = useState("");
  const [reparationType, setReparationType] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [exitHour, setExitHour] = useState("");
  const [collectDate, setCollectDate] = useState("");
  const [collectHour, setCollectHour] = useState("");
  const { id } = useParams();
  const [titleRepairForm, setTitleRepairForm] = useState("");

  const navigate = useNavigate();

  /*
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
  */

  const saveRepair = (v) => {
    v.preventDefault();

    //const repair = { plate, checkinDate, checkinHour, reparationType, totalAmount, exitDate, exitHour,collectDate, collectHour, id };
    const repair = { plate, reparationType, id };
    if (id) {
        repairService
            .update(repair)
            .then((response) => {
                console.log("Reparacion ha sido actualizado.", response.data);
                navigate("/repair/list");
            })
            .catch((error) => {
                console.log("Ocurrió un error al actualizar el vehículo.", error);
            });
    } else {
        repairService
            .create(repair)
            .then((response) => {
                console.log("Vehículo ha sido registrado.", response.data);
                navigate("/repair/list");
            })
            .catch((error) => {
                console.log("Ocurrió un error al crear el vehículo.", error);
            });
    }
};

  const calculateRepair = (r) => {
    r.preventDefault();
    console.log("Solicitar calcular reparacion.");
    repairService
      .calculateIn()
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

  const exitDateHour = (r) => {

  };

  const collectDateHour = (r) => {

  };

  useEffect(() => {
    if (id) {
        setTitleRepairForm("Editar Reparacion");
        repairService
            .get(id)
            .then((repair) => {
                setPlate(repair.data.plate);
                //setCheckinDate(repair.data.brand);
                //setCheckinHour(repair.data.model);
                setReparationType(repair.data.type);
                //setTotalAmount(repair.data.year);
                //setExitDate(repair.data.motor);
                //setExitHour(repair.data.seats);
                //setCollectDate(repair.data.mileage);
                //setCollectHour(repair.data.mileage);
            })
            .catch((error) => {
                console.log("Se produjo un error.", error);
            });
    } else {
        setTitleVehicleForm("Registrar Nueva Reparacion");
    }
}, []);

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
        <FormControl width=" 25% ">
          <TextField
            id="plate"
            label="Patente"
            value={plate}
            variant="standard"
            onChange={(r) => setPlate(r.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="reparationType"
            label="Tipo de Reparación"
            value={reparationType}
            select
            variant="standard"
            defaultValue="1"
            onChange={(r) => setReparationType(r.target.value)}
            style={{ width: "25%" }}
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

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="info"
            onClick={(r) => saveRepair(r)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<CalculateIcon />}
          >
            Ingresar Reparación
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default RepairCalculate;