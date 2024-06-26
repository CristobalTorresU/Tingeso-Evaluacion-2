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
import Button from "@mui/material/Button";
import CarRepair from "@mui/icons-material/CarRepair";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

const RepairList = () => {
    const [repairs, setRepair] = useState([]);

    const navigate = useNavigate();

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

    useEffect(() => {
        init();
    }, []);

    const handleDetails = (id) => {
        console.log("Printing id", id);
        navigate(`/repair/details/${id}`);
    };

    const enterDateHour = (id) => {
        navigate(`/repair/exit/${id}`);
    };

    const handleDelete = (id) => {
        console.log("Printing id", id);
        const confirmDelete = window.confirm(
          "¿Esta seguro que desea borrar esta reparacion?"
        );
        if (confirmDelete) {
          repairService
            .remove(id)
            .then((response) => {
              console.log("La reparacion ha sido eliminada.", response.data);
              init();
            })
            .catch((error) => {
              console.log(
                "Se ha producido un error al intentar eliminar la reparacion.",
                error
              );
            });
        }
      };

    return (
        <TableContainer component={Paper} sx={{ witdh: '100%'}}>
            <br />
            <br />
            <h3>Registro de Reparaciones</h3>
            <br />
            <Table sx={{ width: '100%', tableLayout: 'auto' }} size="small" aria-label="a dense table">
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
                            Año Fabricación
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
                    {repairs.map((repairWithVehicle) => {
                        const { repair, vehicle } = repairWithVehicle;
                    return (
                        <TableRow key={repair.id}>
                            <TableCell align="right">{vehicle.plate}</TableCell>
                            <TableCell align="right">{vehicle.brand}</TableCell>
                            <TableCell align="right">{vehicle.model}</TableCell>
                            <TableCell align="right">{vehicle.type}</TableCell>
                            <TableCell align="right">{vehicle.year}</TableCell>
                            <TableCell align="right">{vehicle.motor}</TableCell>
                            <TableCell align="right">{repair.checkinDate}</TableCell>
                            <TableCell align="right">{repair.checkinHour}</TableCell>
                            <TableCell align="right">
                                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    repair.repairsAmount
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    repair.rechargesAmount
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    repair.discountsAmount
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    repair.repairsAmount + repair.rechargesAmount - repair.discountsAmount
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    repair.iva
                                )}
                            </TableCell>
                            <TableCell align="right">
                                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    repair.totalAmount
                                )}
                            </TableCell>
                            <TableCell align="right">{repair.exitDate}</TableCell>
                            <TableCell align="right">{repair.exitHour}</TableCell>
                            <TableCell align="right">{repair.collectDate}</TableCell>
                            <TableCell align="right">{repair.collectHour}</TableCell>

                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="info"
                                    size="small"
                                    onClick={() => enterDateHour(repair.id)}
                                    style={{ marginLeft: "0.5rem" }}
                                    sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#AA75F0' } }}
                                    startIcon={<InfoIcon />}
                                >
                                    Agregar Fecha y Hora
                                </Button>

                                <Button
                                    variant="contained"
                                    color="info"
                                    size="small"
                                    onClick={() => handleDetails(repair.id)}
                                    style={{ marginLeft: "0.5rem" }}
                                    sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#AA75F0' } }}
                                    startIcon={<InfoIcon />}
                                >
                                    Detalles
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDelete(repair.id)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<DeleteIcon />}
                                >
                                    Agregar Fecha y Hora
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
            <br />
            <Link
                to="/repair/add-moment"
                style={{ textDecoration: "none", marginBottom: "1rem"}}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CarRepair />}
                    sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#AA75F0' } }}
                >
                    Añadir Reparación
                </Button>
            </Link>
            <br /> <br />
        </TableContainer>
    );
};

export default RepairList;