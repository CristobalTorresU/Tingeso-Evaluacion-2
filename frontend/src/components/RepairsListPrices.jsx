import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import repairListService from "../services/repair_list.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RepairListPrices = () => {
  const [repairsList, setRepairList] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    repairListService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los vehículos.", response.data);
        setRepairList(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los vehículos.",
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
      "¿Esta seguro que desea borrar este vehículo?"
    );
    if (confirmDelete) {
      repairListService
        .remove(id)
        .then((response) => {
          console.log("Vehículo ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar el vehículo",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/repair-list/edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <br />
      <h3>Lista de Tipos de Reparaciones</h3>
      <Link
        to="/repair-list/register"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#AA75F0' } }}
        >
          Añadir Tipo de Reparación
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Nombre Reparación
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Precio Gasolina
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Precio Diésel
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Precio Híbrido
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Precio Eléctrico
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repairsList.map((repairList) => (
            <TableRow
              key={repairList.id}
            >
              <TableCell align="left">{repairList.repairName}</TableCell>
              <TableCell align="right">
                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  repairList.gasolineAmount
                )}
              </TableCell>
              <TableCell align="right">
                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  repairList.dieselAmount
                )}
              </TableCell>
              <TableCell align="right">
                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  repairList.hibridAmount
                )}
              </TableCell>
              <TableCell align="right">
                $ {new Intl.NumberFormat("es-CL", { style: "decimal" }).format(
                  repairList.electricAmount
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(repairList.id)}
                  style={{ marginLeft: "0.5rem" }}
                  sx={{ bgcolor: '#9C27B0', '&:hover': { bgcolor: '#AA75F0' } }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(repairList.id)}
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

export default RepairListPrices;