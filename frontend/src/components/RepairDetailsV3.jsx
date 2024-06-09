import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import detailService from "../services/detail.service";
import Button from "@mui/material/Button";
import CarRepair from "@mui/icons-material/CarRepair";
import { Divider } from "@mui/material";

const RepairDetails = () => {
    const [detail, setDetail] = useState([]);
    const { id } = useParams();

    const init = () => {
        detailService
            .getByRepairId(id)
            .then((response) => {
                console.log(
                    "Mostrando planilla de reparaciones.",
                    response.data
                );
                setDetail(response.data);
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

    return (
        <TableContainer component={Paper}>
            <br />
            <br />
            <br />
            <h3>Detalle Reparacion</h3>
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableBody>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Reparación
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Fecha
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Hora
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Monto
                        </TableCell>
                    </TableRow>
                    {detail.map((detail) => (
                        <TableRow key={detail.id}>
                            <TableCell align="left">{detail.repairType}</TableCell>
                            <TableCell align="left">{detail.date}</TableCell>
                            <TableCell align="left">{detail.hour}</TableCell>
                            <TableCell align="left">
                                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.amount
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br />
            <Link
                to="/repair/list"
                style={{ textDecoration: "none", marginBottom: "1rem"}}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CarRepair />}
                    sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#AA75F0' } }}
                >
                    Volver a Registro de Reparaciones
                </Button>
            </Link>
            <br /> <br />
        </TableContainer>
    );
};

export default RepairDetails;