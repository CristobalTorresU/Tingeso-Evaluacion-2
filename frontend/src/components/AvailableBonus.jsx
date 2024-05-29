import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bonusService from "../services/bonus.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreTimeIcon from '@mui/icons-material/MoreTime';

const AvailableBonus = () => {
    const [bonuses, setBonus] = useState([]);

    const navigate = useNavigate();

    const init = () => {
        bonusService
            .getAll()
            .then((response) => {
                console.log("Mostrando listado de todos los Bonus.", response.data);
                setBonus(response.data);
            })
            .catch((error) => {
                console.log(
                    "Se ha producido un error al intentar mostrar listado de todos los Bonus.",
                    error
                );
            });
    };

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log("Printing id", id);
        const confirmDelete = window.confirm(
            "¿Esta seguro que desea borrar este bonus?"
        );
        if (confirmDelete) {
            bonusService
                .remove(id)
                .then((response) => {
                    console.log("Bonus ha sido eliminado.", response.data);
                    init();
                })
                .catch((error) => {
                    console.log(
                        "Se ha producido un error al intentar eliminar el Bonus.",
                        error
                    );
                });
        }
    };

    const handleEdit = (id) => {
        console.log("Printing id", id);
        navigate(`/bonus/edit/${id}`);
    };

    return (
        <TableContainer component={Paper}>
            <br />
            <br />
            <h3>Bonus Disponibles</h3>
            <Link
                to="/bonus/add"
                style={{ textDecoration: "none", marginBottom: "1rem" }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MoreTimeIcon />}
                >
                    Ingresar Bonus
                </Button>
            </Link>
            <br /> <br />
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Marca
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: "bold" }}>
                            Cantidad
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                            Monto
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bonuses.map((bonus) => (
                        <TableRow
                            key={bonus.id}
                        >
                            <TableCell align="left">{bonus.brand}</TableCell>
                            <TableCell align="center">{bonus.quantity}</TableCell>
                            <TableCell align="right">
                                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                                    bonus.amount
                                )}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="info"
                                    size="small"
                                    onClick={() => handleEdit(bonus.id)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<EditIcon />}
                                >
                                    Editar
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDelete(bonus.id)}
                                    style={{ marginLeft: "0.5rem" }}
                                    startIcon={<DeleteIcon />}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AvailableBonus;