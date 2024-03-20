import { useContext, useEffect, useState } from "react";
import "./header.scss"
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { LoginContext } from "../../context/loginContext";
import { jsonFromJwt } from "../../assets/sass/global/user_decoded";
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ViewHeadlineOutlinedIcon from '@mui/icons-material/ViewHeadlineOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
const Header: React.FC = (): JSX.Element => {

    let [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    function handleLoginRegister() {
        navigate("/loginRegister")
    }

    const { user, setUser } = useContext(LoginContext);
    useEffect(() => {
        isLogged = jsonFromJwt("jwtData") || false;
        setIsLogged(isLogged);
    }, [user]);

    function handleLogout() {
        sessionStorage.clear();
        navigate("/loginRegister")
        setUser(null);
        setIsLogged(false);
    }


    return (
        <div className="header-component">
            <div className="header-left">
                {isLogged && !user?.isAdmin ?
                    <div className="buttons-header-left">
                        <button
                            onClick={() => { navigate("/order") }}
                            className="btn-header-left">
                            <ViewListIcon />
                            Orders
                        </button>
                        <button
                            onClick={() => { navigate("/bouquets") }}
                            className="btn-header-left">
                            <LocalFloristIcon />
                            Bouquets
                        </button>
                        <button
                            onClick={() => { navigate("/cartPage") }}
                            className="btn-header-left">
                            <ShoppingBagOutlinedIcon />
                            Cart
                        </button>
                        <button
                            onClick={() => { navigate("/clientPage") }}
                            className="btn-header-left">
                            <ViewHeadlineOutlinedIcon />
                            View
                        </button>
                    </div>
                    :
                    null
                }
                {isLogged && user?.isAdmin ?
                    <div className="buttons-header-left">
                        <button
                            onClick={() => { navigate("/orderManager") }}
                            className="btn-header-left">
                            <ViewListIcon />
                            Clients orders
                        </button>
                        <button
                            onClick={() => { navigate("/manager") }}
                            className="btn-header-left">
                            <LocalFloristIcon />
                            Store
                        </button>
                    </div> : null}

            </div>
            <div className="header-mid">
                FLOWER SHOP
            </div>
            <div className="header-right">
                {isLogged ?
                    <div className="logged-right">
                        <div className="logged-fname-lname">{user?.firstname} {user?.lastname}</div>
                        <button
                            onClick={handleLogout}
                            className="logRegBtn">LOGOUT</button>
                    </div>
                    :
                    <button
                        className="logRegBtn"
                        onClick={handleLoginRegister}
                    >LOGIN/REGISTER</button>
                }

            </div>
        </div>
    )
}

export default Header;
