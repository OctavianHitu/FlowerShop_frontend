import { useContext, useEffect, useState } from "react";
import "./clientPage.scss"
import { Flower, FlowerContext } from "../../context/flowerContext";
import CardFlower from "../../components/flowerCard/flowerCard";
import FlowerCardsShow from "../../components/flowerCards/flowerCards";
import Pagination from "../../components/pagination/pagination";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment, Switch } from "@mui/material";
import { FlowersEnum } from "../../assets/sass/global/flowerEnum";
import { ColorEnum } from "../../assets/sass/global/flowerColor";
import { BasketContext } from "../../context/basketContext";

const ClientPage: React.FC = (): JSX.Element => {

    const { flowers, getFlowers, flowersForClients } = useContext(FlowerContext);

    const [page, setPage] = useState(1);



    function handlePageChange(num: number) { setPage(num); }
    function handleDown() { if (page > 1) { setPage(page - 1); } }
    function handleUp() { if (page < totalPages) { setPage(page + 1); } }

    //filter
    const priceRegex = RegExp(/^[0-9]*$/);

    function removeDuplicates(arr: any) {
        return arr.filter((item: any, index: any) => arr.indexOf(item) === index);
    }
    let flowersForFilter = flowersForClients.map((fl: Flower) => { return fl.name });
    flowersForFilter = removeDuplicates(flowersForFilter);

    let colorsForFilter = flowersForClients.map((fl: Flower) => { return fl.color });
    colorsForFilter = removeDuplicates(colorsForFilter);
    const [flower, setFlower] = useState({
        name: "",
        price: 0,
        color: "",
        quantity: ""
    });
    const [orderFl, setOrderFl] = useState({
        priceAsc: false,
        priceDesc: false
    })
    const [filteredFlowers, setFilteredFlowers] = useState(flowersForClients);
    const [price, setPrice] = useState(false);
    const totalPages = Math.ceil(filteredFlowers.length / 8);

    useEffect(() => {
        setFilteredFlowers(flowersForClients);
    }, [flowersForClients])

    useEffect(() => {
        let helperFlowers = flowersForClients;
        if (flower.name != "") {
            helperFlowers = helperFlowers.filter((fl: Flower) => {
                return fl.name === flower.name
            })
        }
        if (flower.price != 0) {
            helperFlowers = helperFlowers.filter((fl: Flower) => {
                return fl.price <= flower.price
            })
        }
        if (flower.color != "") {
            helperFlowers = helperFlowers.filter((fl: Flower) => {
                return fl.color === flower.color
            })
        }
        if (flower.quantity != "") {
            switch (flower.quantity) {
                case "available": {
                    helperFlowers = helperFlowers.filter((fl: Flower) => { return fl.quantity > 10 })
                    break;
                }
                case "lastitems": {
                    helperFlowers = helperFlowers.filter((fl: Flower) => { return fl.quantity <= 10 })
                    break;
                }
            }

        }
        if (orderFl.priceAsc === true) {
            helperFlowers.sort((a: Flower, b: Flower) => (a.price < b.price ? -1 : 1))
        } else {
            helperFlowers.sort((a: Flower, b: Flower) => (a.price > b.price ? -1 : 1))
        }
        setFilteredFlowers(helperFlowers);

    }, [orderFl, flower])

    const { basket, setBasket, addFlower } = useContext(BasketContext);

    async function handleOrder() {
        setOrderFl({ ...orderFl });
    }
    console.log(flowersForClients)

    return (
        <div className="client-page">
            <div className="filter-order-flowers">
                <div className="filter-order-selectors">
                    <div>
                        Filters
                    </div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Flower</InputLabel>
                        <Select
                            placeholder="Flower name"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={flower.name}

                            onChange={(e: any) => {
                                setFlower({ ...flower, name: e.target.value });
                            }}
                        >
                            {flowersForFilter.map((e: any) => {
                                return (
                                    <MenuItem value={e} key={e}>
                                        {e}
                                    </MenuItem>
                                );
                            })}

                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Maximul price</InputLabel>
                        <OutlinedInput
                            error={price}
                            id="outlined-adornment-amount"
                            startAdornment={
                                <InputAdornment position="start">RON</InputAdornment>
                            }
                            onChange={(e: any) => {
                                if (!priceRegex.test(e.target.value)) {
                                    setPrice(true);
                                } else {
                                    setPrice(false);
                                    setFlower({ ...flower, price: e.target.value });
                                }
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Color</InputLabel>
                        <Select
                            placeholder="Flower name"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={flower.color}

                            onChange={(e: any) => {
                                setFlower({ ...flower, color: e.target.value });
                            }}
                        >
                            {colorsForFilter.map((e: any) => {
                                return (
                                    <MenuItem value={e} key={e}>
                                        {e}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Availability</InputLabel>
                        <Select
                            placeholder="Availability"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={flower.quantity}

                            onChange={(e: any) => {
                                setFlower({ ...flower, quantity: e.target.value });
                            }}
                        >
                            <MenuItem value={"available"}>Available</MenuItem>
                            <MenuItem value={"lastitems"}>Last items</MenuItem>
                        </Select>
                    </FormControl>

                    <button
                        className="btn-res-filters"
                        onClick={() => {
                            setFlower({
                                name: "",
                                price: 0,
                                color: "",
                                quantity: ""
                            });
                            setOrderFl({
                                priceAsc: false,
                                priceDesc: false
                            });
                        }}
                    >
                        Reset filters
                    </button>
                    <div>
                        Order by:
                    </div>
                    <div>
                        Price ascendent <Switch
                            checked={orderFl.priceAsc}
                            onChange={(e: any) => {
                                setOrderFl({ ...orderFl, priceAsc: e.target.checked, priceDesc: false })
                            }}
                        />
                    </div>
                    <div>
                        Price descendent <Switch
                            checked={orderFl.priceDesc}
                            onChange={(e: any) => {
                                setOrderFl({ ...orderFl, priceDesc: e.target.checked, priceAsc: false })
                            }}
                        />
                    </div>
                    <button className="btn-res-filters" onClick={handleOrder}>Order</button>
                </div>
            </div>
            <div className="show-flowers">
                <FlowerCardsShow flowers={filteredFlowers} page={page} />
                <Pagination
                    totalPages={totalPages}
                    handleClick={handlePageChange}
                    handleDown={handleDown}
                    handleUp={handleUp}
                />
            </div>
            <div></div>

        </div>
    )
}

export default ClientPage; 