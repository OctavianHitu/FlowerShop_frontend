import { useContext } from "react";
import getAxiosInstance from "../../axios-service";
import { Bouquet, BouquetContext, FlowerItem } from "../../context/bouquetContext";
import { Flower } from "../../context/flowerContext";
import "./bouquetCard.scss"
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import { BasketContext } from "../../context/basketContext";
interface BouquetCardShow {
    bouquet: Bouquet;
    inBasket: boolean;
}

const BouquetCard: React.FC<BouquetCardShow> = (props): JSX.Element => {

    const { getBouquets } = useContext(BouquetContext);
    const { basket, addBouquet, deleteBouquet } = useContext(BasketContext);

    function handleDeleteBou() {
        getAxiosInstance().put("/bouquet/deleteBouquet/" + JSON.stringify(props.bouquet.id)).then(() => {
            getBouquets();
        })
    }

    function handleAddBasketBouquet(bq: Bouquet) {
        addBouquet(bq);
        console.log(basket)
    }
    function handleDeleteBouquetFromBasket(bouquet: Bouquet) {
        deleteBouquet(bouquet);
    }

    return (
        <div className="bouquet-card">
            <div className="bq-card-fl-icon">
                <FilterVintageIcon fontSize="large" />
                <div>{props.bouquet.bouquetName}</div>
            </div>

            <div className="bq-flowers-list">
                {props.bouquet.flowers.map((obj: FlowerItem) => {
                    return (
                        <div className="bq-flower-item">
                            <div>
                                {obj.flower.name} {obj.flower.color} -
                            </div>
                            <div>
                                {obj.numberOfFlowers} flowers
                            </div>

                        </div>
                    )
                })}
            </div>
            <div className="total-bq-card">
                <div>
                    Total: {props.bouquet.bouquetPrice} RON
                </div>

            </div >
            {
                props.inBasket ?
                    null :
                    <div className="bq-buttons-item">
                        <div className="bq-item-btn-container">
                            <button className="btn-for-handler" onClick={() => { handleAddBasketBouquet(props.bouquet) }}>Add to cart</button>
                        </div>
                        <div className="bq-item-btn-container">
                            <button onClick={handleDeleteBou} className="btn-for-handler">Delete</button>
                        </div>
                    </div>
            }


        </div >
    )
}

export default BouquetCard;

