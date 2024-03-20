import { Bouquet } from "../../context/bouquetContext";
import BouquetCard from "../showBouquetCard/bouquetCard";
import "./bouquetsCardShow.scss";
interface BouquetsCardsShow {
    bouquets: Bouquet[];
    page: number;
}

const BouquetCardsShow: React.FC<BouquetsCardsShow> = (props): JSX.Element => {

    const startIndex = (props.page - 1) * 4;

    const selectedFlowers = props.bouquets.slice(startIndex, startIndex + 4);
    const firstRow = selectedFlowers.slice(0, 2);
    const secondsRow = selectedFlowers.slice(2, 4);
    return (
        <div className="bqs-cards-show">
            <div className="first-row-bqs">
                {firstRow.map(
                    fl => (
                        <BouquetCard key={fl.id} inBasket={false} bouquet={fl} />
                    )
                )}
            </div>
            <div className="second-row-bqs">
                {secondsRow.map(
                    fl => (
                        <BouquetCard key={fl.id} inBasket={false} bouquet={fl} />
                    )
                )}
            </div>
        </div>
    )
}

export default BouquetCardsShow;