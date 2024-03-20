import { useContext, useEffect, useState } from "react";
import "./bouquetsPage.scss"
import { LoginContext } from "../../context/loginContext";
import { Flower, FlowerContext } from "../../context/flowerContext";
import { Alert, Button, Dialog, DialogActions, DialogTitle, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Snackbar } from "@mui/material";
import getAxiosInstance from "../../axios-service";
import { Bouquet, BouquetContext } from "../../context/bouquetContext";
import BouquetCard from "../../components/showBouquetCard/bouquetCard";
import BouquetCardsShow from "../../components/BouquetCardsShow/bouquetsCardsShow";
import Pagination from "../../components/pagination/pagination";

export interface FlowerItemDto {
    flowerId: string,
    numberOfFlowers: number
}
export interface BouquetDto {
    userId: string,
    bouquetName: string,
    flowers: FlowerItemDto[]
}

export interface FlowerItem {
    flower: Flower,
    numberOfFlowers: number
}

export interface BouquetAuxiliar {
    user: number | undefined,
    bouquetName: string,
    flowers: FlowerItem[]
}
const BouquetsPage: React.FC = (): JSX.Element => {
    const priceRegex = RegExp(/^[0-9]*$/);
    const { user } = useContext(LoginContext);
    const { flowers } = useContext(FlowerContext);
    const [amount, setAmount] = useState(false);
    const [qVerif, setQVerif] = useState(false);

    const { bouquets, getBouquets } = useContext(BouquetContext);


    const [bouquetDto, setBouquetDto] = useState<BouquetDto>({
        userId: JSON.stringify(user?.id),
        bouquetName: "",
        flowers: []
    })

    const [found, setFound] = useState(false);
    const handleClose2 = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") { return; }
        setFound(false);
    };
    const [flowerItem, setFlowerItem] = useState<FlowerItem>({
        flower: {
            id: 0,
            name: "",
            price: 0,
            color: "",
            quantity: 0,
            image: "",
            showFlower: false
        },
        numberOfFlowers: 0
    });

    const [bouquetAuxialr, setBouquetAuxiliar] = useState<BouquetAuxiliar>({
        user: user?.id,
        bouquetName: "",
        flowers: []
    })

    const [semiTotal, setSemiTotal] = useState(0);

    function calculateTotalPerFlowerItem(fl: FlowerItem) {
        let sm = 0;
        sm = fl.flower.price * fl.numberOfFlowers;

        return sm;
    }

    function handleAddToList() {
        if (bouquetAuxialr.flowers.find((obj: FlowerItem) => { return obj.flower.id == flowerItem.flower.id })) {
            setFound(true);
        } else {
            bouquetAuxialr.flowers.push(flowerItem);
            setSemiTotal(semiTotal + calculateTotalPerFlowerItem(flowerItem));
            setBouquetAuxiliar({ ...bouquetAuxialr, flowers: bouquetAuxialr.flowers })
        }
    }

    function handleCreateBouquet() {

        const flowersForDto: FlowerItemDto[] = bouquetAuxialr.flowers.map(
            (obj: FlowerItem) => {
                return { flowerId: JSON.stringify(obj.flower.id), numberOfFlowers: obj.numberOfFlowers }
            }
        )
        setBouquetDto({
            userId: JSON.stringify(bouquetAuxialr.user),
            bouquetName: bouquetAuxialr.bouquetName,
            flowers: flowersForDto
        });

        console.log(bouquetDto)
        setopenDialog(true);

    }

    useEffect(() => {
    }, [bouquetDto, bouquets])



    const [openDialog, setopenDialog] = useState(false);

    const handleClose = () => {
        setopenDialog(false);
    };

    function handleFinalCreate() {
        getAxiosInstance().post("/bouquet/saveBouquet", JSON.stringify(bouquetDto)).then(() => {
            getBouquets();
        })
        setopenDialog(false);


    }

    function handleClear() {
        setBouquetAuxiliar({ ...bouquetAuxialr, flowers: [] });
    }


    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(bouquets.length / 4);


    function handlePageChange(num: number) { setPage(num); }
    function handleDown() { if (page > 1) { setPage(page - 1); } }
    function handleUp() { if (page < totalPages) { setPage(page + 1); } }

    return (
        <div className="bouquetsPage">
            <div className="bouPage-left">
                <div className="bouquets-left-add">
                    <div className="create-bouquet">Create bouquet</div>
                    <div className="bq-names-in">
                        <div className="bq-name-row">
                            Bouquet name:
                        </div>
                        <FormControl fullWidth>
                            <OutlinedInput
                                id="outlined-adornment-amount"

                                onChange={(e: any) => {
                                    setBouquetAuxiliar({ ...bouquetAuxialr, bouquetName: e.target.value })
                                }}
                            />
                        </FormControl>
                    </div>
                    <div className="flower-add-inputs">
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={flowerItem.flower.id}
                                onChange={(elem: any) => {
                                    setFlowerItem({ ...flowerItem, numberOfFlowers: 0 })
                                    let helperFlower: Flower = flowers.find((fl: Flower) => { return fl.id === elem.target.value })
                                    if (helperFlower != undefined) {
                                        setFlowerItem({ ...flowerItem, flower: helperFlower });
                                    }

                                }}
                            >
                                {flowers.map((e: Flower) => {
                                    return (
                                        <MenuItem value={e.id} key={e.id}>
                                            {e.name} {e.color} | Maximum quantity: {e.quantity}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <OutlinedInput
                                error={amount || qVerif}
                                id="outlined-adornment-amount"
                                endAdornment={
                                    <InputAdornment position="end">flowers</InputAdornment>
                                }
                                onChange={(e: any) => {
                                    if (!priceRegex.test(e.target.value)) {
                                        setAmount(true);
                                    } else {
                                        setAmount(false);
                                        if (flowerItem.flower.quantity < e.target.value) {
                                            setQVerif(true);
                                        } else {
                                            setQVerif(false);
                                            setFlowerItem({ ...flowerItem, numberOfFlowers: e.target.value })

                                        }
                                    }
                                }}
                            />
                        </FormControl>
                    </div>
                    <div className="btn-add-flower-to-list">
                        <button
                            className="btn-to-add-fl"
                            disabled={amount || qVerif}
                            onClick={handleAddToList}>
                            Add to bouquet
                        </button>
                    </div>
                    <div className="bou-wr">
                        Bouquet:
                    </div>
                    <div className="flowers-list-after-added">
                        {bouquetAuxialr.flowers.map((obj: FlowerItem) => {
                            return (
                                <div key={obj.flower.id} className="item-after-added">
                                    <div className="img-row-container">
                                        <img className="row-img-added" src={obj.flower.image} />
                                    </div>

                                    <div className="row-bqt-infos">
                                        <div>
                                            {obj.flower.name} {obj.flower.color} {obj.flower.price}Ron
                                        </div>
                                        <div>
                                            {obj.numberOfFlowers}items    Subtotal:{obj.flower.price * obj.numberOfFlowers}Ron
                                        </div>

                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    <div className="div-for-create-btn">
                        {bouquetAuxialr.flowers.length == 0 ? null :
                            <div className="wr-semi-total-pr">
                                Total: {semiTotal} + 20Ron
                            </div>}
                        <button className="create-btn-bqt" onClick={handleClear}  >Clear</button>
                        <button className="create-btn-bqt" onClick={handleCreateBouquet} >Create</button>
                    </div>

                    <Snackbar open={found} autoHideDuration={3000} onClose={handleClose2}>
                        <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
                            Flower already in bouquet!
                        </Alert>
                    </Snackbar>
                    <Dialog
                        open={openDialog}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle>Create a new bouquet?</DialogTitle>
                        <DialogActions>
                            <Button onClick={handleFinalCreate}>Yes</Button>
                            <Button onClick={handleClose}>No</Button>
                        </DialogActions>
                    </Dialog>

                </div>

            </div>
            <div className="bouPage-right">
                <div className="yr-bq-wr">BOUQUETS</div>
                <div className="bouquets-show-div">
                    <BouquetCardsShow bouquets={bouquets} page={page} />
                    <Pagination
                        totalPages={totalPages}
                        handleClick={handlePageChange}
                        handleDown={handleDown}
                        handleUp={handleUp}
                    />
                </div>


            </div>
        </div>
    )
}
export default BouquetsPage;