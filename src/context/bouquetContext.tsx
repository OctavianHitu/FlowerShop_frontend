import { createContext, useContext, useEffect, useState } from "react";
import { Flower } from "./flowerContext";
import { User } from "./userContext";
import getAxiosInstance from "../axios-service";
import { LoginContext } from "./loginContext";
import { stringify } from "querystring";

export interface FlowerItem {
    id: number;
    flower: Flower;
    numberOfFlowers: number;
    price: number;
}
export interface Bouquet {
    id: number;
    user: string;
    bouquetName: string;
    flowers: FlowerItem[];
    bouquetPrice: number;
}

export interface BouquetType {
    bouquets: Bouquet[];
    setBouquets: React.Dispatch<React.SetStateAction<Bouquet[]>>;
}

export const BouquetContext = createContext<any>({
    bouquets: [],
    setBouquets: () => { }
})

export const BouquetProvider = (props: any) => {
    const [bouquets, setBouquets] = useState<Bouquet[]>([]);

    const { user } = useContext(LoginContext)
    async function getBouquets() {
        const { data } = await getAxiosInstance().get("/bouquet");
        const helper = await data.filter((obj: Bouquet) => { return obj.user == JSON.stringify(user?.id) })
        setBouquets(helper);
    }
    useEffect(() => {
        getBouquets();
    }, [])

    return (
        <BouquetContext.Provider value={{ bouquets, setBouquets, getBouquets }}>
            {props.children}
        </BouquetContext.Provider>
    )
}