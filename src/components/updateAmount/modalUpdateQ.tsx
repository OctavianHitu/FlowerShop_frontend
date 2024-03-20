import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import "./modalUpdateQ.scss";
import ClearIcon from '@mui/icons-material/Clear';
import { useContext, useState } from "react";
import getAxiosInstance from "../../axios-service";
import { FlowerContext } from "../../context/flowerContext";
export interface ModalUpdate {
    id: number;
    name: string;
    color: string;
    onClose: any;
}


const ModalUpdate = (props: ModalUpdate): JSX.Element => {
    const priceRegex = RegExp(/^[0-9]*$/);
    const [amount, setAmount] = useState(false);

    const [amountUpdate, setAmountUpdate] = useState(0);
    const { getFlowers } = useContext(FlowerContext);

    function handleUpdateAmount() {
        if (amountUpdate != 0) {
            getAxiosInstance().put("/flower/updateQuantity/" + props.id + "/" + amountUpdate).then(
                () => {
                    getFlowers();
                    props.onClose();
                }

            )
        }
    }
    return (
        <div className="fullUpdateModal">
            <div className="updateModal">
                <div className="top-modal">
                    <div>{props.name} {props.color}</div>
                    <button className='btn-away-modal' onClick={() => { props.onClose() }}><ClearIcon fontSize='large' /></button>
                </div>
                <div className="bottom-modal">
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                        <OutlinedInput
                            error={amount}
                            id="outlined-adornment-amount"
                            endAdornment={
                                <InputAdornment position="end">flowers</InputAdornment>
                            }
                            onChange={(e: any) => {
                                if (!priceRegex.test(e.target.value)) {
                                    setAmount(true);
                                } else {
                                    setAmount(false);
                                    setAmountUpdate(e.target.value);
                                }
                            }}
                        />
                    </FormControl>
                    <Button
                        style={{
                            color: "#fff",
                            backgroundColor: "#857e61",
                            height: "53%"
                        }}
                        variant="contained"
                        onClick={handleUpdateAmount}
                    >
                        update
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default ModalUpdate;