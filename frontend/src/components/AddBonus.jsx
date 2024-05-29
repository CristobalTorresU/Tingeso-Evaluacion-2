import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import bonusService from "../services/bonus.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import { MenuItem } from "@mui/material";

const AddBonus = () => {
    const [brand, setBrand] = useState("");
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const { id } = useParams();
    const [titleBonusForm, setTitleBonusForm] = useState("");
    const navigate = useNavigate();

    const saveBonus = (b) => {
        b.preventDefault();

        const bonus = { brand, amount, quantity, id };
        if (id) {
            bonusService
                .update(bonus)
                .then((response) => {
                    console.log("Bonus ha sido actualizado.", response.data);
                    navigate("/bonus/list");
                })
                .catch((error) => {
                    console.log("Ocurrió un error al actualizar el bonus.", error);
                });
        } else {
            bonusService
                .create(bonus)
                .then((response) => {
                    console.log("Bonus ha sido ingresado.", response.data);
                    navigate("/bonus/list");
                })
                .catch((error) => {
                    console.log("Ocurrió un error al ingresar el bonus.", error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            setTitleBonusForm("Editar Bonus");
            bonusService
                .get(id)
                .then((bonus) => {
                    setBrand(bonus.data.brand);
                    setAmount(bonus.data.amount);
                    setQuantity(bonus.data.quantity);
                })
                .catch((error) => {
                    console.log("Se produjo un error.", error);
                });
        } else {
            setTitleBonusForm("Ingresar Bonus");
        }
    }, []);
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            component="form"
        >
            <hr />
            <h3> {titleBonusForm} </h3>
            <hr />
            <form>
                <FormControl fullWidth>
                    <TextField
                        id="brand"
                        label="Marca"
                        value={brand}
                        variant="standard"
                        onChange={(b) => setBrand(b.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        id="amount"
                        label="Monto"
                        type="number"
                        value={amount}
                        variant="standard"
                        onChange={(b) => setAmount(b.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField
                        id="quantity"
                        label="Cantidad"
                        type="number"
                        value={quantity}
                        variant="standard"
                        onChange={(b) => setQuantity(b.target.value)}
                    />
                </FormControl>

                <FormControl>
                    <br />
                    <Button
                        variant="contained"
                        color="info"
                        onClick={(b) => saveBonus(b)}
                        style={{ marginLeft: "0.5rem" }}
                        startIcon={<SaveIcon />}
                    >
                        Guardar Bonus
                    </Button>
                </FormControl>
            </form>
            <hr />
            <Link to="/bonus/list">Mostrar Bonos Disponibles</Link>
        </Box>
    );
};

export default AddBonus;