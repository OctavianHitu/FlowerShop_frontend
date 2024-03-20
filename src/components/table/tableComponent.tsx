import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Flower, FlowerContext } from "../../context/flowerContext";
import { useContext, useState } from "react";
import "./tableComponent.scss"
import ModalUpdate from "../updateAmount/modalUpdateQ";
import getAxiosInstance from "../../axios-service";
export interface TableComponent {
    flowerList: Flower[];
}

const TableComponent = (props: TableComponent): JSX.Element => {

    const { getFlowers } = useContext(FlowerContext);

    const [modalUpdate, setModalUpdate] = useState(false);
    const [flId, setFlId] = useState(0);
    const [color, setColor] = useState("");
    const [name, setName] = useState("");

    function handleChangeShow(id: number) {
        getAxiosInstance().put("/flower/changeShow/" + JSON.stringify(id)).then(() => {
            getFlowers();
        })
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" stickyHeader style={{ maxHeight: '300px' }} >
                    <TableHead >
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Color</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableHead>
                    <TableBody >
                        {props.flowerList.map((row: any) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">
                                    <img style={{ maxHeight: '50px', maxWidth: '50px' }} src={row.image} />
                                </TableCell>
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.color}
                                </TableCell>
                                <TableCell align="center">
                                    {row.price} RON
                                </TableCell>
                                <TableCell align="center">
                                    {row.quantity}
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        style={{
                                            color: "#fff",
                                            backgroundColor: "#857e61"
                                        }}
                                        variant="contained"
                                        onClick={() => {
                                            setFlId(row.id);
                                            setName(row.name);
                                            setColor(row.color);
                                            setModalUpdate(true);
                                        }}
                                    >UPDATE</Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        style={{
                                            color: "#fff",
                                            backgroundColor: "#857e61"
                                        }}
                                        variant="contained"
                                        onClick={() => {
                                            handleChangeShow(row.id);
                                        }}
                                    >{row.showFlower == true ? "Hide" : "Show"}</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {modalUpdate ?
                <ModalUpdate
                    id={flId}
                    name={name}
                    color={color}
                    onClose={() => {
                        setModalUpdate(false);
                        getFlowers();
                    }}
                /> : null}
        </div>
    )
}
export default TableComponent;