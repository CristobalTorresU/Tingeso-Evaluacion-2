import { useEffect, useState } from "react";
import time_reportService from "../services/time_report.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TimeReportList = () => {
    const [timeReports, setTimeReport] = useState([]);

    const init = () => {
        time_reportService
            .getOrder()
            .then((response) => {
                console.log("Mostrando reporte por tiempo.", response.data);
                setTimeReport(response.data);
            })
            .catch((error) => {
                console.log(
                    "Se ha producido un error al intentar mostrar el reporte por tiempo",
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
            <h3>Reporte por Tiempo</h3>
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Marca
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Tiempo Reparación
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {timeReports.map((timeReport) => (
                        <TableRow
                            key={timeReport.id}
                        >
                            <TableCell align="left">{timeReport.brand}</TableCell>
                            <TableCell align="center">{timeReport.hours}:{timeReport.minutes}:{timeReport.seconds}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TimeReportList;