import { useEffect, useState } from "react";
import motor_reportService from "../services/motor_report.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const MotorReportList = () => {
    const [motorReports, setMotorReport] = useState([]);

    const init = () => {
        motor_reportService
            .getOrder()
            .then((response) => {
                console.log("Mostrando reporte por motor.", response.data);
                setMotorReport(response.data);
            })
            .catch((error) => {
                console.log(
                    "Se ha producido un error al intentar mostrar el reporte por motor.",
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
            <h3>Reporte por Tipo de Motor</h3>
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Tipo de Reparación
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Tipo de Motor
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Numero de Vehículos
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Monto Total
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {motorReports.map((motorReport) => (
                        <TableRow
                            key={motorReport.id}
                        >
                            <TableCell align="left">{motorReport.repairName}</TableCell>
                            <TableCell align="center">{motorReport.motor}</TableCell>
                            <TableCell align="right">
                                {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    motorReport.quantity
                                )}
                            </TableCell>
                            <TableCell align="right">
                                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    motorReport.totalAmount
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MotorReportList;