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

const RepairList = () => {
    const [repairs, setRepair] = useState([]);

    const NameToRepair =  (number) => {
        switch (number) {
            case 1:
                return 'Reparaciones del Sistema de Frenos';
            case 2:
                return 'Servicio del Sistema de Refrigeración';
            case 3:
                return 'Reparaciones del Motor';
            case 4:
                return 'Reparaciones de la Transmisión';
            case 5:
                return 'Reparación del Sistema Eléctrico';
            case 6:
                return 'Reparaciones del Sistema de Escape';
            case 7:
                return 'Reparación de Neumáticos y Ruedas';
            case 8:
                return 'Reparaciones de la Suspensión y la Dirección';
            case 9:
                return 'Reparación del Sistema de Aire Acondicionado y Calefacción';
            case 10:
                return 'Reparaciones del Sistema de Combustible';
            case 11:
                return 'Reparación y Reemplazo del Parabrisas y Cristales';
        }
    };

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
                            Fecha Entrada
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Hora Entrada
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Reparación
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Fecha Salida
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Hora Salida
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Fecha Colecta
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Hora Colecta
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Monto Total
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {repairs.map((repair) => (
                        <TableRow
                            key={repair.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell align="right">{repair.plate}</TableCell>
                            <TableCell align="right">{repair.checkinDate}</TableCell>
                            <TableCell align="right">{repair.checkinHour}</TableCell>
                            <TableCell align="right">{NameToRepair(repair.reparationType)}</TableCell>
                            <TableCell align="right">{repair.exitDate}</TableCell>
                            <TableCell align="right">{repair.exitHour}</TableCell>
                            <TableCell align="right">{repair.collectDate}</TableCell>
                            <TableCell align="right">{repair.collectHour}</TableCell>

                            <TableCell align="right">
                                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    repair.totalAmount
                                )}
                            </TableCell>
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