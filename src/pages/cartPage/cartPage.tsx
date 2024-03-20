import { useContext, useEffect, useState } from "react";
import "./cartPage.scss"
import { BasketContext, FlowerAmount } from "../../context/basketContext";
import { Flower } from "../../context/flowerContext";
import { Bouquet, BouquetContext } from "../../context/bouquetContext";
import BouquetCard from "../../components/showBouquetCard/bouquetCard";
import { UserContext } from "../../context/userContext";
import { LoginContext } from "../../context/loginContext";
import getAxiosInstance from "../../axios-service";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { OrderContext } from "../../context/orderContext";
export interface FLowerItemDto {
    flowerId: number;
    numberOfFlowers: number;
}

export interface OrderDto {
    userId: number | undefined;
    flowers: FLowerItemDto[];
    bouquetsId: number[];
}
const CartPage: React.FC = (): JSX.Element => {

    const { basket, deleteFlowerAmount, deleteBouquet } = useContext(BasketContext);
    const [total, setTotal] = useState(0);
    const { user } = useContext(LoginContext);
    const { getOrders } = useContext(OrderContext);

    const [orderDto, setOrderDto] = useState<OrderDto>({
        userId: user?.id,
        flowers: [],
        bouquetsId: []
    })

    function handleDeleteFlowerAmount(fl: FlowerAmount) {
        deleteFlowerAmount(fl)
    }
    async function calculateTotal() {
        let ttl = 0;
        await basket.flowers.forEach((fl: FlowerAmount) => { ttl += fl.flower.price * fl.amount })
        await basket.bouquets.forEach((fl: Bouquet) => { ttl += fl.bouquetPrice })
        setTotal(ttl)
    }
    useEffect(() => {
        calculateTotal();
    }, [basket])

    const { getBouquets } = useContext(BouquetContext);
    function handlePlaceOrder() {
        let fll: FLowerItemDto;
        orderDto.flowers = basket.flowers.map((fl: FlowerAmount) => {


            const obj: FLowerItemDto = { flowerId: fl.flower.id, numberOfFlowers: fl.amount };
            return obj;
        })
        orderDto.bouquetsId = basket.bouquets.map((bq: Bouquet) => { return bq.id })
        setOrderDto(orderDto)
        console.log(orderDto);
        getAxiosInstance()
            .post("/order/saveOrder", JSON.stringify(orderDto))
            .then(() => {
                handleCloseOrderDialog();
                getOrders();

            })
    }
    function handleDeleteBouquetFromBasket(bouquet: Bouquet) {
        deleteBouquet(bouquet);
    }

    const [openDialog, setopenDialog] = useState(false);
    const [openOrderDialog, setOpenOrderDialog] = useState(false);

    const handleClose = () => {
        setopenDialog(false);
    };
    const handleCloseOrderDialog = () => {
        setOpenOrderDialog(false);
    };
    return (
        <div className="cartPage">
            <div className="cartPage-left">
                <div className="flowers-list-cart">
                    <div className="flower-wr-div">FLOWERS</div>
                    <div className="flower-list-cart-container">
                        {basket.flowers.map((fl: FlowerAmount) => (
                            <div key={fl.flower.id} className="flower-amount-cart-row">
                                <div className="fl-row-item-1">
                                    <div>
                                        <img className="flower-image-cart" src={fl.flower.image} />
                                    </div>
                                    <div><LocalFloristOutlinedIcon /> {fl.flower.name} </div>
                                    <div><ColorLensIcon /> {fl.flower.color}</div>
                                    <div>Amount: {fl.amount}</div>

                                </div>
                                <div className="btn-for-remove-fl-cart">
                                    <button className="btn-for-handler" onClick={() => { handleDeleteFlowerAmount(fl) }}>Remove from cart</button>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
                <div className="bouquets-list-cart">
                    <div className="bq-wr-div">BOUQUETS</div>
                    <div className="bouquets-list-cart-container">
                        {basket.bouquets.map((fl: Bouquet) => (
                            <div key={fl.id} className="bq-item-cart-row">
                                <div className="bq-item-row-name-price">
                                    <div> Name: {fl.bouquetName}</div>
                                    <div>Price: {fl.bouquetPrice} RON</div>
                                </div>
                                <div className="btns-bq-item-row">
                                    <button className="btn-for-handler" onClick={() => { setopenDialog(true) }}>View</button>
                                    <Dialog
                                        open={openDialog}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"

                                    >
                                        <DialogActions>
                                            <button
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    cursor: "pointer    "
                                                }}
                                                onClick={handleClose}
                                            ><CloseIcon /></button>
                                        </DialogActions>
                                        <DialogContent style={{ width: "450px", height: "360px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <BouquetCard bouquet={fl} inBasket={true} />
                                        </DialogContent>
                                    </Dialog>
                                    <button className="btn-for-handler" onClick={() => { handleDeleteBouquetFromBasket(fl) }}>Remove from cart</button>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

            </div>
            <div className="cartPage-right">
                {total != 0 ?
                    <div className="cart-page-right-container">
                        <div className="total-is">Your total is: {total} RON</div>
                        <div className="btn-place-order">
                            <button className="btn-for-handler" onClick={() => { setOpenOrderDialog(true) }}>Place order</button>
                        </div>
                        <Dialog
                            open={openOrderDialog}
                            onClose={handleCloseOrderDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle>Place order?</DialogTitle>
                            <DialogActions>
                                <Button onClick={handlePlaceOrder}>Yes</Button>
                                <Button onClick={handleCloseOrderDialog}>No</Button>
                            </DialogActions>
                        </Dialog>
                    </div> :
                    null
                }

            </div>
        </div>
    )
}

export default CartPage;
