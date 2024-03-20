import { Flower } from "../../context/flowerContext";
import CardFlower from "../flowerCard/flowerCard";
import "./flowerCardsShow.scss"
interface FlowerCardsShow {
    flowers: Flower[];
    page: number;
}

const FlowerCardsShow: React.FC<FlowerCardsShow> = (props): JSX.Element => {

    const startIndex = (props.page - 1) * 8;

    const selectedFlowers = props.flowers.slice(startIndex, startIndex + 8);
    const firstRow = selectedFlowers.slice(0, 4);
    const secondsRow = selectedFlowers.slice(4, 8);
    return (
        <div className="flower-cards-show">
            <div className="first-row-flowers">
                {firstRow.map(
                    fl => (
                        <CardFlower key={fl.id} flower={fl} />
                    )
                )}
            </div>
            <div className="second-row-flowers">
                {secondsRow.map(
                    fl => (
                        <CardFlower key={fl.id} flower={fl} />
                    )
                )}
            </div>

        </div>
    )
}
export default FlowerCardsShow;

