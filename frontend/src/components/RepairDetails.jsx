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

const RepairDetails = () => {
    const [detail, setDetail] = useState([]);
    const { id } = useParams();

    const init = () => {
        detailService
            .get(id)
            .then((response) => {
                console.log(
                    "Mostrando detalle de reparación.",
                    response.data
                );
                setDetail(response.data);
            })
            .catch((error) => {
                console.log(
                    "Se ha producido un error al intentar mostrar el detalle de reparación.",
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
            <h3>Detalle Reparacion</h3>
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Reparación
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Reparaciones en los últimos 12 meses
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Descuento por horario
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Bonus
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Kilometraje
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Año
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Días de atraso
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            IVA
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {detail.map((detail) => (
                        <TableRow
                            key={detail.id}
                        >
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.repairAmount
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.repairsDiscount
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.dayDiscount
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.bonusDiscount
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.mileageRecharge
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.yearRecharge
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.lateRecharge
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.iva
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
                >
                    Volver a Registro de Reparaciones
                </Button>
            </Link>
            <br /> <br />
        </TableContainer>
    );
};

export default RepairDetails;