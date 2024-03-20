import { createContext, useContext, useEffect, useState } from "react";
import { Bouquet, FlowerItem } from "./bouquetContext";
import { User } from "./userContext";
import getAxiosInstance from "../axios-service";
import { LoginContext } from "./loginContext";

export interface Order {
    id: number;
    user: User;
    flowers: FlowerItem[];
    bouquets: Bouquet[];
    orderPrice: number;
    time: Date;
}

export interface OrderType {
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const OrderContext = createContext<any>({
    orders: [],
    setOrders: () => { },
})

export const OrderProvider = (props: any) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersManager, setOrdersManager] = useState<Order[]>([]);

    const { user } = useContext(LoginContext);

    async function getOrders() {
        const { data } = await getAxiosInstance().get("/order");
        setOrdersManager(data);

        setOrders(data.filter(((or: Order) => {
            return or.user.id === user?.id;
        })));
    }

    useEffect(() => {
        getOrders();
    }, [])


    return (
        <OrderContext.Provider value={{ orders, getOrders, ordersManager }}>
            {props.children}
        </OrderContext.Provider>
    )
}