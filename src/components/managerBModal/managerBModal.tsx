import { Bouquet } from "../../context/bouquetContext";
import BouquetCard from "../showBouquetCard/bouquetCard";
import "./managerBModal.scss"


export interface ManagerBouquetModal {
    bouquets: Bouquet[];
    onClose: any;

}
const ManagerBouModal: React.FC<ManagerBouquetModal> = (props): JSX.Element => {
    console.log("HEEEEEEEEEEEEEEEEEEEEEEE")
    return (
        <div className="modalBB" onClick={() => { props.onClose() }}>
            <div className="modal-container-BB">

                {props.bouquets.map((bb: Bouquet) => {
                    return (
                        <div className="modal-container-row">
                            <BouquetCard bouquet={bb} inBasket={true} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ManagerBouModal;