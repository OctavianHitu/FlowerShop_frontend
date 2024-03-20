import { Route, Routes } from "react-router-dom";
import Header from "../components/header/header";
import "./main.scss"
import LoginRegister from "../pages/login-register-page/login-register";
import { UserProvider } from "../context/userContext";
import { Flower, FlowerProvider } from "../context/flowerContext";
import ManagerPage from "../pages/manager-page/managerPage";
import ClientPage from "../pages/client-page/clientPage";
import { LoginProvider } from "../context/loginContext";
import { useState } from "react";
import React from "react";
import { BasketProvider } from "../context/basketContext";
import BouquetsPage from "../pages/bouquetsPage/bouquetsPage";
import { BouquetProvider } from "../context/bouquetContext";
import CartPage from "../pages/cartPage/cartPage";
import { OrderProvider } from "../context/orderContext";
import OrderPage from "../pages/orderPage/orderPage";
import OrderManagerPage from "../pages/orderManagerPage/orderManagerPage";

export const BasketContext = React.createContext(null);
const Main = () => {

    return (


        <div className="main">
            <OrderProvider>
                <BouquetProvider>
                    <BasketProvider>
                        <LoginProvider>
                            <FlowerProvider>
                                <UserProvider>
                                    <Header />
                                    <Routes>
                                        <Route
                                            path="/manager"
                                            element={<ManagerPage />}
                                        />
                                        <Route
                                            path="/clientPage"
                                            element={<ClientPage />}
                                        />
                                        <Route
                                            path="/loginRegister"
                                            element={<LoginRegister />}
                                        />
                                        <Route
                                            path="/"
                                            element={<LoginRegister />}
                                        />
                                        <Route
                                            path="/bouquets"
                                            element={<BouquetsPage />}
                                        />
                                        <Route
                                            path="/cartPage"
                                            element={<CartPage />}
                                        />
                                        <Route
                                            path="/order"
                                            element={<OrderPage />}
                                        />
                                        <Route
                                            path="/orderManager"
                                            element={<OrderManagerPage />}
                                        />
                                    </Routes>
                                </UserProvider>
                            </FlowerProvider>
                        </LoginProvider>
                    </BasketProvider>
                </BouquetProvider>
            </OrderProvider>
        </div>
    )
}

export default Main;