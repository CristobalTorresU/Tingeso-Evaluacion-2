import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import repairListService from "../services/repair_list.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";

const RegisterRepairsListPrices = () => {
    const [repairName, setRepairName] = useState("");
    const [gasolineAmount, setGasolineAmount] = useState("");
    const [dieselAmount, setDieselAmount] = useState("");
    const [hibridAmount, setHibridAmount] = useState("");
    const [electricAmount, setElectricAmount] = useState("");
    const { id } = useParams();
    const [titleRepairsListForm, setTitleRepairsListForm] = useState("");
    const navigate = useNavigate();

    const saveRepairsList = (v) => {
        v.preventDefault();

        const repairList = { repairName, gasolineAmount, dieselAmount, hibridAmount, electricAmount, id };
        if (id) {
            repairListService
                .update(repairList)
                .then((response) => {
                    console.log("Tipo de reparación ha sido actualizada.", response.data);
                    navigate("/repair-list/list");
                })
                .catch((error) => {
                    console.log("Ocurrió un error al actualizar el tipo de reparación.", error);
                });
        } else {
            repairListService
                .create(repairList)
                .then((response) => {
                    console.log("Tipo de reparacion ha sido registrada.", response.data);
                    navigate("/repair-list/list");
                })
                .catch((error) => {
                    console.log("Ocurrió un error al crear el tipo de reparación.", error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            setTitleRepairsListForm("Editar Tipo de Reparación");
            repairListService
                .get(id)
                .then((repairList) => {
                    setRepairName(repairList.data.repairName);
                    setGasolineAmount(repairList.data.gasolineAmount);
                    setDieselAmount(repairList.data.dieselAmount);
                    setHibridAmount(repairList.data.hibridAmount);
                    setElectricAmount(repairList.data.electricAmount);
                })
                .catch((error) => {
                    console.log("Se produjo un error.", error);
                });
        } else {
            setTitleRepairsListForm("Registrar Nuevo Tipo de Reparación");
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
            <h3> {titleRepairsListForm} </h3>
            <hr />
            <form>
                <FormControl fullWidth>
                    <TextField
                        id="repariName"
                        label="Nombre"
                        value={repairName}
                        variant="standard"
                        onChange={(r) => setRepairName(r.target.value)}
                    />
                </FormControl>

                <br/>
                <br/>

                <FormControl fullWidth>
                    <TextField
                        id="gasolineAmount"
                        label="Precio Gasolina"
                        type="number"
                        value={gasolineAmount}
                        variant="standard"
                        onChange={(r) => setGasolineAmount(r.target.value)}
                    />
                </FormControl>

                <br/>
                <br/>

                <FormControl fullWidth>
                    <TextField
                        id="dieselAmount"
                        label="Precio Diésel"
                        type="number"
                        value={dieselAmount}
                        variant="standard"
                        onChange={(r) => setDieselAmount(r.target.value)}
                    />
                </FormControl>

                <br/>
                <br/>

                <FormControl fullWidth>
                    <TextField
                        id="hibridAmount"
                        label="Precio Híbrido"
                        type="number"
                        value={hibridAmount}
                        variant="standard"
                        onChange={(r) => setHibridAmount(r.target.value)}
                    />
                </FormControl>

                <br/>
                <br/>

                <FormControl fullWidth>
                    <TextField
                        id="electricAmount"
                        label="Precio Eléctrico"
                        type="number"
                        value={electricAmount}
                        variant="standard"
                        onChange={(r) => setElectricAmount(r.target.value)}
                    />
                </FormControl>

                <br/>
                <br/>

                <FormControl>
                    <Button
                        variant="contained"
                        color="info"
                        onClick={(r) => saveRepairsList(r)}
                        style={{ marginLeft: "0.5rem" }}
                        sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#AA75F0' } }}
                        startIcon={<SaveIcon />}
                    >
                        Guardar Lista de Reparación
                    </Button>
                </FormControl>
            </form>
            <hr />
            <Link to ="/repair-list/list">Mostrar Lista de Precios de Reparaciones</Link>
        </Box>
    );
};

export default RegisterRepairsListPrices;