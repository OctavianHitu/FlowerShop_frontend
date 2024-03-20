import { useContext, useState } from "react";
import { Order, OrderContext } from "../../context/orderContext";
import "./orderPage.scss"
import moment from "moment";
import { LoginContext } from "../../context/loginContext";
import { Dialog, DialogContent } from "@mui/material";
import ManagerBouModal from "../../components/managerBModal/managerBModal";
import { FlowerItem } from "../bouquetsPage/bouquetsPage";
import { Bouquet } from "../../context/bouquetContext";

const OrderPage: React.FC = (): JSX.Element => {

    const { orders } = useContext(OrderContext);

    const { user } = useContext(LoginContext);

    function getDateFormated(date: Date) {



        return moment(date).format("MMMM DD YYYY");
    }
    const [openDialog, setopenDialog] = useState(false);
    const [openDialogBB, setopenDialogBB] = useState(false);

    const handleClose = () => {
        setopenDialog(false);
    };
    const handleCloseBB = () => {
        setopenDialogBB(false);
    };
    const [flowersForView, setFlowersForView] = useState<FlowerItem[]>([]);
    const [bouquetsForView, setBouquetsForView] = useState<Bouquet[]>([]);
    return (
        <div className="orderPage">
            <div className="orderPage-container">
                <div className="orders-wwr">
                    Orders
                </div>
                <div className="order-rows-for-client">
                    {orders.map((order: Order) => {
                        return (
                            <div key={order.id} className="order-row-item">
                                <div></div>
                                <div>ID: {order.id}</div>
                                <div>PRICE: {order.orderPrice} RON</div>
                                <div>DATE: {getDateFormated(order.time).toString()} </div>
                                <div className="flowers-order-view-client">Flowers:
                                    {order.flowers.length == 0 ? "None" :
                                        <button
                                            className="btn-view-fl-order"
                                            onClick={() => { setFlowersForView(order.flowers); setopenDialog(true) }}>
                                            View
                                        </button>
                                    }
                                </div>
                                <div className="flowers-order-view-client">Bouquets:
                                    {order.bouquets.length == 0 ? "None" :
                                        <button
                                            className="btn-view-fl-order"
                                            onClick={() => { setBouquetsForView(order.bouquets); setopenDialogBB(true) }}>
                                            View
                                        </button>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        {flowersForView.map((fl: FlowerItem) => {
                            return (
                                <div>
                                    <div>Flower: {fl.flower.name} Color: {fl.flower.color}  Number: {fl.numberOfFlowers}</div>
                                </div>
                            )
                        })}
                    </DialogContent>
                </Dialog>

                {openDialogBB ?
                    (<ManagerBouModal
                        bouquets={bouquetsForView}
                        onClose={() => {
                            setopenDialogBB(false);
                        }}
                    />) : null}
            </div>

        </div>
    );
}

export default OrderPage;