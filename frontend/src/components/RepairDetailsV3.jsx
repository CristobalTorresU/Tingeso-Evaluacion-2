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
            .get(id)
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
                    <TableCell>
                        <TableRow align="left" sx={{ fontWeight: "bold" }}>
                            Reparación
                        </TableRow>
                        <Divider />
                        <TableRow align="left" sx={{ fontWeight: "bold" }}>
                            Reparaciones en los últimos 12 meses
                        </TableRow>
                        <TableRow align="left" sx={{ fontWeight: "bold" }}>
                            Descuento por horario
                        </TableRow>
                        <TableRow align="left" sx={{ fontWeight: "bold" }}>
                            Bonus
                        </TableRow>
                        <TableRow align="left" sx={{ fontWeight: "bold" }}>
                            Total Descuentos
                        </TableRow>
                        <Divider />
                        <TableRow align="left" sx={{ fontWeight: "bold" }}>
                            Kilometraje
                        </TableRow>
                        <TableRow align="left" sx={{ fontWeight: "bold" }}>
                            Año
                        </TableRow>
                        <TableRow align="left" sx={{ fontWeight: "bold" }}>
                            Días de Atraso
                        </TableRow>
                        <TableRow align="left" sx={{ fontWeight: "bold" }}>
                            Total Recargos
                        </TableRow>
                        <Divider />
                        <TableRow align="left" sx={{ fontWeight: "bold" }}>
                            IVA
                        </TableRow>
                        <Divider />
                        <TableRow align="left" sx={{ fontWeight: "bold" }}>
                            Monto Total
                        </TableRow>
                    </TableCell>
                    {detail.map((detail) => (
                        <TableCell
                            key={detail.id}
                        >
                            <TableRow align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.repairAmount
                                )}
                            </TableRow>
                            <TableRow align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    - detail.repairsDiscount
                                )}
                            </TableRow>
                            <TableRow align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    - detail.dayDiscount
                                )}
                            </TableRow>
                            <TableRow align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    - detail.bonusDiscount
                                )}
                            </TableRow>
                            <TableRow align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    - detail.bonusDiscount - detail.dayDiscount - detail.repairsDiscount
                                )}
                            </TableRow>
                            <TableRow align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.mileageRecharge
                                )}
                            </TableRow>
                            <TableRow align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.yearRecharge
                                )}
                            </TableRow>
                            <TableRow align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.lateRecharge
                                )}
                            </TableRow>
                            <TableRow align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.lateRecharge + detail.yearRecharge + detail.mileageRecharge
                                )}
                            </TableRow>
                            <TableRow align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.iva
                                )}
                            </TableRow>
                            <TableRow align="right">
                                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    detail.repairAmount - detail.repairsDiscount - detail.dayDiscount -
                                    detail.bonusDiscount + detail.mileageRecharge + detail.yearRecharge +
                                    detail.lateRecharge + detail.iva
                                )}
                            </TableRow>
                        </TableCell>
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