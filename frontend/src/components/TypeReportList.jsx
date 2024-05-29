import { useEffect, useState } from "react";
import type_reportService from "../services/type_report.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TypeReportList = () => {
    const [typeReports, setTypeReport] = useState([]);

    const init = () => {
        type_reportService
            .getOrder()
            .then((response) => {
                console.log("Mostrando reporte por tipos.", response.data);
                setTypeReport(response.data);
            })
            .catch((error) => {
                console.log(
                    "Se ha producido un error al intentar mostrar el reporte por tipo",
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
            <br /> <br />
            <h3>Reporte por Tipo de Vehículo</h3>
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Tipo de Reparación
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Tipo de Vehículo
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Número de Vehículos
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Monto Total
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {typeReports.map((typeReport) => (
                        <TableRow
                            key={typeReport.id}
                        >
                            <TableCell align="left">{typeReport.repairName}</TableCell>
                            <TableCell align="center">{typeReport.type}</TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    typeReport.quantity
                                )}
                            </TableCell>
                            <TableCell align="right">
                                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    typeReport.totalAmount
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TypeReportList;