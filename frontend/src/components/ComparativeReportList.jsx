import React, { useEffect, useState } from "react";
import comparative_reportService from "../services/comparative_report.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ComparativeReportList = () => {
    const [comparativeReports, setComparativeReport] = useState([]);

    const NumberToMonth = (number) => {
        switch (number) {
            case 1:
                return 'ENERO';
            case 2:
                return 'FEBRERO';
            case 3:
                return 'MARZO';
            case 4:
                return 'ABRIL';
            case 5:
                return 'MAYO';
            case 6:
                return 'JUNIO';
            case 7:
                return 'JULIO';
            case 8:
                return 'AGOSTO';
            case 9:
                return 'SEPTIEMBRE';
            case 10:
                return 'OCTUBRE';
            case 11:
            case -1:
                return 'NOVIEMBRE';
            case 12:
            case 0:
                return 'DICIEMBRE';
        }
    };

    const init = () => {
        comparative_reportService
            .getAll()
            .then((response) => {
                console.log("Mostrando reporte comparativo mensual.", response.data);
                setComparativeReport(response.data);
            })
            .catch((error) => {
                console.log(
                    "Se ha producido un error al intentar mostrar el reporte comparativo mensual.",
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
            <h3>Reporte Comparativo de Reparaciones Mensuales</h3>
            <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            MES
                        </TableCell>
                        {comparativeReports.length > 0 && (
                            <>
                                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                    {NumberToMonth(comparativeReports[0].month)}
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                    % Variacion
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                    {NumberToMonth(comparativeReports[0].month - 1)}
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                    % Variacion
                                </TableCell>
                                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                                    {NumberToMonth(comparativeReports[0].month - 2)}
                                </TableCell>
                            </>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {comparativeReports.map((comparativeReport) => (
                        <React.Fragment key={comparativeReport.id}>
                            <TableRow>
                                <TableCell align="left">{comparativeReport.repair}</TableCell>
                                <TableCell align="right">
                                    {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                        comparativeReport.quantityNow
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                        comparativeReport.variationQ1
                                    )}%
                                </TableCell>
                                <TableCell align="right">
                                    {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                        comparativeReport.quantity1
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                        comparativeReport.variationQ2
                                    )}%
                                </TableCell>
                                <TableCell align="right">
                                    {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                        comparativeReport.quantity2
                                    )}%
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">
                                    $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                        comparativeReport.amountNow
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                        comparativeReport.variationA1
                                    )}%
                                </TableCell>
                                <TableCell align="right">
                                    $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                        comparativeReport.amount1
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                        comparativeReport.variationA2
                                    )}%
                                </TableCell>
                                <TableCell align="right">
                                    $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                        comparativeReport.amount2
                                    )}
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ComparativeReportList;