
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

const RepairDetails = () => {
    const [details, setDetail] = useState([]);
    const { id } = useParams;

    function createRow(desc, price) {
        return { desc, price };
    }

    const rows = [
        createRow('Reparacion', details.repairAmount),
        createRow('Ultimos 12 meses', details.repairDiscount),
        createRow('Horario', details.dayDiscount),
        createRow('Bonus', details.bonusDiscount),
        createRow('Kilometraje', details.mileageRecharge),
        createRow('Ano', details.yearRecharge),
        createRow('Atraso', details.lateRecharge),
    ];

    const init = () => {
        detailService
            .get(id)
            .then((response) => {
                console.log(
                    "Mostrando planilla de reparaciones.",
                    response.data
                );
                /*
                const rows = [
                    createRow('Reparacion', response.data.repairAmount),
                    createRow('Ultimos 12 meses', response.data.repairDiscount),
                    createRow('Horario', response.data.dayDiscount),
                    createRow('Bonus', response.data.bonusDiscount),
                    createRow('Kilometraje', response.data.mileageRecharge),
                    createRow('Ano', response.data.yearRecharge),
                    createRow('Atraso', response.data.lateRecharge),
                ];
                */
                console.log("Owo: ", response.data.repairAmount);
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
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                            Detalle
                        </TableCell>
                        <TableCell align="right">Monto</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Motivo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">
                            {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                //detail.repairAmount - detail.repairDiscount - detail.dayDiscount - 
                                //detail.bonusDiscount + detail.mileageRecharge + detail.yearRecharge + 
                                //detail.lateRecharge
                                8000
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>IVA</TableCell>
                        <TableCell align="right">{`${(0.19 * 100).toFixed(0)} %`}</TableCell>
                        <TableCell align="right">
                            {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                8
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">
                            {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                40
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RepairDetails;