import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import repairService from "../services/repair.service";
import vehicleService from "../services/vehicle.service";
import Button from "@mui/material/Button";
import CarRepair from "@mui/icons-material/CarRepair";
import InfoIcon from "@mui/icons-material/Info";

const RepairList = () => {
    const [repairs, setRepair] = useState([]);
    const [vehicles, setVehicle] = useState([]);

    const navigate = useNavigate();

    const fetchVehicleDetails = async (plate) => {
        try {
            const response = await vehicleService.getByPlate(plate);
            return response.data;
        } catch (error) {
            console.error(`Error fetching vehicle details for plate ${plate}:`, error);
            return null;
        }
    };

    const init = async () => {
        try {
            const repairResponse = await repairService.getAll();
            const repairData = repairResponse.data;

            const vehiclePromises = repairData.map(repair => fetchVehicleDetails());
            const vehicleData = await Promise.all(vehiclePromises);

            const combinedData = repairData.map((repair, index) => ({
                ...repair,
                vehicle: vehicleData[index]
            }));

            setRepair(combinedData);
        } catch (error) {
            console.log("Se ha producido un error al intentar mostrar planilla de reparaciones.", error);
        }
    };

    // TODO: Hacer que tome distintos atributos de vehiculos y detalles simultaneamente para mostrarlo en el front.
    /*
    const init = () => {
        repairService
            .getAll()
            .then((response) => {
                console.log(
                    "Mostrando planilla de reparaciones.",
                    response.data
                );
                setRepair(response.data);
            })
            .catch((error) => {
                console.log(
                    "Se ha producido un error al intentar mostrar planilla de reparaciones.",
                    error
                );
            });
    };
    */

    useEffect(() => {
        init();
    }, []);

    const handleDetails = (id) => {
        console.log("Printing id", id);
        navigate(`/repair/details/${id}`);
    };

    return (
        <TableContainer component={Paper}>
            <br />
            <br />
            <h3>Registro de Reparaciones</h3>
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Patente
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Marca
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Modelo
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Tipo Vehículo
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Año Fabricacion
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Tipo Motor
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Fecha Ingreso Taller
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Hora Ingreso Taller
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Monto Total Reparaciones
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Monto Recargos
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Monto Dctos
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            SUB Total
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Monto IVA
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Costo Total
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Fecha Salida Taller
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Hora Salida Taller
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Fecha Retiro Cliente
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Hora Retiro Cliente
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {repairs.map((repair) => (
                        <TableRow
                            key={repair.id}
                        >
                            <TableCell align="right">{repair.plate}</TableCell>
                            <TableCell align="right">{vehicle.brand}</TableCell>
                            <TableCell align="right">{vehicle.model}</TableCell>
                            <TableCell align="right">{vehicle.type}</TableCell>
                            <TableCell align="right">{vehicle.year}</TableCell>
                            <TableCell align="right">{vehicle.motor}</TableCell>
                            <TableCell align="right">{repair.checkinDate}</TableCell>
                            <TableCell align="right">{repair.checkinHour}</TableCell>
                            <TableCell align="right">
                                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    repair.totalAmount
                                )}
                            </TableCell>
                            <TableCell align="right">{repair.rechargeAmount}</TableCell>
                            <TableCell align="right">{repair.discountAmount}</TableCell>


                            <TableCell align="right">{repair.iva}</TableCell>
                            <TableCell align="right">{repair.exitDate}</TableCell>
                            <TableCell align="right">{repair.exitHour}</TableCell>
                            <TableCell align="right">{repair.collectDate}</TableCell>
                            <TableCell align="right">{repair.collectHour}</TableCell>

                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="info"
                                    size="small"
                                    onClick={() => handleDetails(repair.repair_id)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<InfoIcon />}
                                >
                                    Detalles
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br />
            <Link
                to="/repair/add"
                style={{ textDecoration: "none", marginBottom: "1rem"}}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CarRepair />}
                >
                    Añadir Reparación
                </Button>
            </Link>
            <br /> <br />
        </TableContainer>
    );
};

export default RepairList;