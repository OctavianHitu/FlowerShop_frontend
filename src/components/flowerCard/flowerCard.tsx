import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputAdornment, OutlinedInput, Snackbar } from "@mui/material";
import { Flower, FlowerContext } from "../../context/flowerContext";
import "./flowerCard.scss";
import { useContext, useState } from "react";
import { BasketContext, FlowerAmount } from "../../context/basketContext";
import { FlowerItem } from "../../context/bouquetContext";
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import ColorLensIcon from '@mui/icons-material/ColorLens';
interface FlowerCard {
    flower: Flower;
}

const CardFlower: React.FC<FlowerCard> = (props): JSX.Element => {

    const [openDialog, setopenDialog] = useState(false);
    const [qVerif, setQVerif] = useState(false);
    const [amount, setAmount] = useState(false);
    const priceRegex = RegExp(/^[0-9]*$/);

    const handleClose = () => {
        setopenDialog(false);
    };
    const { basket, addFlower, setBasket } = useContext(BasketContext);

    const [flowerAmountItem, setFlowerAmountItem] = useState<FlowerAmount>({
        flower: props.flower,
        amount: 0
    })
    function handleAddFlToBasket(fl: Flower) {

        if (basket.flowers.find((x: FlowerAmount) => x.flower.id === props.flower.id)) {
            setFound(true)
        } else {
            addFlower(flowerAmountItem)
        }
        handleClose();

    }

    function handleOpenDiag() {
        setopenDialog(true);
    }
    const [found, setFound] = useState(false);
    const handleClose2 = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setFound(false);
    };

    return (
        <div className="flowerCard">
            <div className="flower-card-photo">
                <img className="fl-ph-card" src={props.flower.image} />
            </div>
            <div className="flower-card-info">
                <div className="flower-card-name-color">
                    <div><LocalFloristOutlinedIcon /> {props.flower.name}</div>
                    <div><ColorLensIcon /> {props.flower.color}</div>
                </div>
                <div className="flower-card-stock-btn">
                    <div className="flower-card-stock">
                        {props.flower.quantity > 10 ?
                            <div className="stock-update avaible" >AVAILABLE</div> : null}
                        {props.flower.quantity === 0 ?
                            <div className="stock-update out-of-stock">OUT OF STOCK</div> : null}
                        {props.flower.quantity <= 10 && props.flower.quantity > 0 ?
                            <div className="stock-update only-available">{props.flower.quantity} AVAILABLE</div> : null}
                        <div className="stock-update">{props.flower.price}RON</div>
                    </div>
                    <div className="flower-card-add-btn">
                        <button onClick={handleOpenDiag} className="btn-card-add">
                            Add to cart
                        </button>
                    </div>
                    <Dialog
                        open={openDialog}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle>Insert amount of flowers</DialogTitle>
                        <DialogContent>
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
                                            if (props.flower.quantity < e.target.value) {
                                                setQVerif(true);
                                            } else {
                                                setQVerif(false);
                                                setFlowerAmountItem({ ...flowerAmountItem, amount: e.target.value })

                                            }
                                        }
                                    }}
                                />
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button disabled={amount || qVerif} onClick={() => { handleAddFlToBasket(props.flower) }}>Add to basket</Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar open={found} autoHideDuration={3000} onClose={handleClose2}>
                        <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
                            Flower already in the cart!
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    )
}

export default CardFlower;