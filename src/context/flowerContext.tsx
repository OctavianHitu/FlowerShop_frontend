import { createContext, useEffect, useState } from "react";
import getAxiosInstance from "../axios-service";


export interface Flower {
    id: number;
    name: string;
    price: number;
    color: string;
    quantity: number;
    image: string;
    showFlower: boolean;
}

export interface FlowerType {
    flowers: Flower[];
    setFlowers: React.Dispatch<React.SetStateAction<Flower[]>>;
}

export const FlowerContext = createContext<any>({
    flowers: [],
    setFlowers: () => { },
})
export const FlowerProvider = (props: any) => {
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [flowersForClients, setFlowersForClients] = useState<Flower[]>([]);

    async function getFlowers() {
        const { data } = await getAxiosInstance().get("/flower");
        setFlowers(data);
        setFlowersForClients(data.filter((f: Flower) => {
            return f.showFlower == true;
        }))
    }

    useEffect(() => {
        getFlowers();
    }, [])

    return (
        <FlowerContext.Provider value={{ flowers, setFlowers, getFlowers, flowersForClients }}>
            {props.children}
        </FlowerContext.Provider>
    )
}
