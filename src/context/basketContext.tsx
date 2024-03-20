import React, { useEffect, useState } from "react";
import { Flower } from "./flowerContext";
import { Bouquet, FlowerItem } from "./bouquetContext";

export interface FlowerAmount {
    flower: Flower;
    amount: number;
}
export interface Basket {
    flowers: FlowerAmount[]
    bouquets: Bouquet[];
}
export const BasketContext = React.createContext<any>(null);

export const BasketProvider = (props: any) => {

    const [basket, setBasket] = useState<Basket>({ flowers: [], bouquets: [] });

    async function addFlower(fl: FlowerAmount) {
        basket.flowers.push(fl);
        setBasket({ ...basket, flowers: basket.flowers });
        sessionStorage.setItem("basket", JSON.stringify(basket));
    }
    async function addBouquet(bq: Bouquet) {
        basket.bouquets.push(bq);
        setBasket({ ...basket, bouquets: basket.bouquets });
        sessionStorage.setItem("basket", JSON.stringify(basket));
    }
    async function getBasket() {
        const storedItem = sessionStorage.getItem("basket");
        if (storedItem != null) {
            let basketStored: Basket = JSON.parse(storedItem);
            setBasket(basketStored)
        }

    }

    async function deleteBouquet(bq: Bouquet) {
        const index = basket.bouquets.indexOf(bq)
        if (index != -1) {
            basket.bouquets.splice(index, 1);
        }
        setBasket({ ...basket, bouquets: basket.bouquets });
        sessionStorage.setItem("basket", JSON.stringify(basket));
    }

    async function deleteFlowerAmount(flowerAm: FlowerAmount) {
        const index = basket.flowers.indexOf(flowerAm)
        if (index != -1) {
            basket.flowers.splice(index, 1);
        }
        setBasket({ ...basket, flowers: basket.flowers });
        sessionStorage.setItem("basket", JSON.stringify(basket));
    }
    useEffect(() => {
        getBasket();
    }, [])

    return (
        <BasketContext.Provider value={{ basket, setBasket, addFlower, addBouquet, deleteBouquet, deleteFlowerAmount }}>
            {props.children}
        </BasketContext.Provider>
    )

}