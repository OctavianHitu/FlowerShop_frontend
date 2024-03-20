import { Alert, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, Snackbar, Table, TableCell, TableContainer, TableHead } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import "./managerPage.scss"
import { useContext, useEffect, useState } from "react";
import { FlowersEnum } from "../../assets/sass/global/flowerEnum";
import { ColorEnum } from "../../assets/sass/global/flowerColor";
import { Flower, FlowerContext } from "../../context/flowerContext";
import getAxiosInstance from "../../axios-service";
import TableComponent from "../../components/table/tableComponent";

const ManagerPage: React.FC = (): JSX.Element => {
    const { flowers, getFlowers } = useContext(FlowerContext);

    const [flower, setFlower] = useState({
        name: "",
        price: 0,
        color: "",
        quantity: 0,
        image: ""
    });
    const priceRegex = RegExp(/^[0-9]*$/);
    const [price, setPrice] = useState(false);
    const [amount, setAmount] = useState(false);
    const [file, setFile] = useState();
    const [flFound, setFlFound] = useState(false);
    const [flInsert, setFlInsert] = useState(false);
    const convertBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    async function showPreview1(event: any) {
        if (event.target.files.length > 0) {
            //@ts-ignore
            setFile(URL.createObjectURL(event.target.files[0]))
            const base64 = await convertBase64(event.target.files[0]);
            setFlower({ ...flower, image: String(base64) })
        }
    }

    function handleInsertFlower() {
        const isFound = flowers.some((elem: Flower) => {
            if (elem.name === flower.name && elem.color === flower.color) {
                return true;
            }
        })

        if (isFound === true) {
            setFlFound(true);
        } else {
            getAxiosInstance().post("/flower/saveFlower", JSON.stringify(flower)).then(
                () => {
                    setFlInsert(true);
                    getFlowers();
                }

            )
        }

    }


    function show() {
        console.log(flowers);
    }

    const closeFlowerFound = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setFlFound(false);
    };
    const closeFlInsert = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setFlInsert(false);
    };
    console.log(flowers)

    return (
        <div className="managerPage">
            <div className="managerPage-left">
                <div className="manager-addflower">
                    <div className="fl-wr">New flower</div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Flower</InputLabel>
                        <Select
                            placeholder="Flower name"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={flower.name}

                            onChange={(e: any) => {
                                setFlower({ ...flower, name: e.target.value });
                            }}
                        >
                            {Object.keys(FlowersEnum).map((e: any) => {
                                return (
                                    <MenuItem value={e} key={e}>
                                        {e}
                                    </MenuItem>
                                );
                            })}

                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Price</InputLabel>
                        <OutlinedInput
                            error={price}
                            id="outlined-adornment-amount"
                            startAdornment={
                                <InputAdornment position="start">RON</InputAdornment>
                            }
                            onChange={(e: any) => {
                                if (!priceRegex.test(e.target.value)) {
                                    setPrice(true);
                                } else {
                                    setPrice(false);
                                    setFlower({ ...flower, price: e.target.value })
                                }
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Color</InputLabel>
                        <Select
                            placeholder="Flower name"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={flower.color}

                            onChange={(e: any) => {
                                setFlower({ ...flower, color: e.target.value });
                            }}
                        >
                            {Object.keys(ColorEnum).map((e: any) => {
                                return (
                                    <MenuItem value={e} key={e}>
                                        {e}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                        <OutlinedInput
                            error={amount}
                            id="outlined-adornment-amount"
                            endAdornment={
                                <InputAdornment position="end">flowers</InputAdornment>
                            }
                            onChange={(e: any) => {
                                if (!priceRegex.test(e.target.value)) {
                                    setAmount(true);
                                } else {
                                    setAmount(false);
                                    setFlower({ ...flower, quantity: e.target.value })
                                }
                            }}
                        />
                    </FormControl>
                    <div className="flower-photo">
                        <div className="flower-in">
                            <div>Insert Photo</div>
                            <label htmlFor="flowerPh">

                                <DriveFolderUploadIcon />
                            </label>
                            <input
                                type="file"
                                id="flowerPh"
                                accept="image/*"
                                style={{
                                    display: "none"
                                }}
                                onChange={(event) => {
                                    showPreview1(event);
                                }}
                            />
                        </div>
                        <img className="flower-photo" id="flower-ph" src={file} />

                    </div>

                    <button className="button-insert-flower"
                        onClick={handleInsertFlower}
                    >
                        Insert flower
                    </button>
                    <Snackbar open={flFound} autoHideDuration={3000} onClose={closeFlowerFound}>
                        <Alert onClose={closeFlowerFound} severity="error" sx={{ width: "100%" }}>
                            Flower exists in database!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={flInsert} autoHideDuration={3000} onClose={closeFlInsert}>
                        <Alert onClose={closeFlInsert} severity="success" sx={{ width: "100%" }}>
                            Flower inserted succefully!
                        </Alert>
                    </Snackbar>
                </div>
            </div>
            <div className="managerPage-right">
                <div className="database-wr">Database</div>
                <div className="table-div">
                    <TableComponent flowerList={flowers} />
                </div>
            </div>
        </div>
    )
}

export default ManagerPage;