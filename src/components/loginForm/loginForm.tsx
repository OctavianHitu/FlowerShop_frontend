import { useContext, useState } from "react";
import "./loginForm.scss";
import { useNavigate } from "react-router";
import getAxiosInstance from "../../axios-service";
import { json } from "stream/consumers";
import { decodeUserJwt } from "../../assets/sass/global/user_decoded";
import { LoginContext } from "../../context/loginContext";
import { Alert, Snackbar } from "@mui/material";
import { BouquetContext } from "../../context/bouquetContext";

const LoginForm: React.FC = (): JSX.Element => {

    const [data, setData] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const { setUser } = useContext(LoginContext);
    async function handleLogin(event: any) {
        event.preventDefault();
        const jwtData = await getAxiosInstance()
            .post("/auth/authentication", JSON.stringify(data)).catch(
                () => { setFound(true) })
        if (jwtData) {
            sessionStorage.setItem("jwtData", JSON.stringify(jwtData));
            const decodedUser = decodeUserJwt("jwtData");
            setUser(decodedUser);
            console.log(decodedUser);
            if (decodedUser.isAdmin === true) {
                navigate("/manager");
            } else {
                navigate("/clientPage");
            }
        }

    }
    const [found, setFound] = useState(false);

    const handleClose2 = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setFound(false);
    };
    return (
        <div className="loginform-container">
            <div className="login-wr">
                LOGIN
            </div>
            <input className="row-login"
                type={"email"}
                placeholder="EMAIL"
                onChange={(event: any) => {
                    data.email = event.target.value;
                    setData(data);
                }}
            />
            <input className="row-login"
                type={"password"}
                placeholder="PASSWORD"
                onChange={(event: any) => {
                    data.password = event.target.value;
                    setData(data);
                }} />
            <button className="logBtn" onClick={handleLogin}>
                LOGIN
            </button>
            <Snackbar open={found} autoHideDuration={3000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
                    Email or password incorrect!
                </Alert>
            </Snackbar>

        </div>
    )
}
export default LoginForm;