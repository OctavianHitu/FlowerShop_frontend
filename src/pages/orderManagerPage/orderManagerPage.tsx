import { useContext, useState } from "react";
import { Order, OrderContext } from "../../context/orderContext";
import "./orderManagerPage.scss"
import moment from "moment";
import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from "@mui/material";
import { Bouquet, FlowerItem } from "../../context/bouquetContext";
import BouquetCard from "../../components/showBouquetCard/bouquetCard";
import ManagerBouModal from "../../components/managerBModal/managerBModal";

const OrderManagerPage: React.FC = (): JSX.Element => {

    const { ordersManager } = useContext(OrderContext);

    function getDateFormated(date: Date) {

        return moment(date).format("MMMM DD YYYY");
    }
    console.log(ordersManager);
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
        <div className="orderManagerPage">
            <div className="orderManagerPage-container">
                <div className="orders-manager-wwr">
                    Orders
                </div>
                <div className="order-manager-rows-for-client">
                    {ordersManager.map((order: Order) => {
                        return (
                            <div key={order.id} className="order-manager-row-item">
                                <div></div>
                                <div>ID: {order.id}</div>
                                <div>PRICE: {order.orderPrice} RON</div>
                                <div>DATE: {getDateFormated(order.time).toString()} </div>
                                <div className="flowers-order-view">
                                    Flowers:
                                    {order.flowers.length == 0 ? "None" :
                                        <button
                                            className="btn-view-fl-order"
                                            onClick={() => { setFlowersForView(order.flowers); setopenDialog(true) }}>
                                            View
                                        </button>
                                    }

                                </div>
                                <div className="flowers-order-view">Bouquets:
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

export default OrderManagerPage;