
import { useContext, useState } from "react";
import "./registerForm.scss"
import { UserContext } from "../../context/userContext";
import { FlowerContext } from "../../context/flowerContext";
import { Alert, Snackbar } from "@mui/material";
import getAxiosInstance from "../../axios-service";

const RegisterForm: React.FC = (): JSX.Element => {

    const [userRegister, setUserRegister] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        password: "",
        isAdmin: false
    });

    const emailregex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const nameRegex = RegExp(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/);
    const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

    const [firstNameAlert, setFirstNameAlert] = useState(false);
    const [lastNameAlert, setLastNameAlert] = useState(false);
    const [emailAlert, setEmailAlert] = useState(false);
    const [passAlert, setPassAlert] = useState(false);
    const [passSecondAlert, setPassSecondAlert] = useState(false);

    const { users, getUsers } = useContext(UserContext);

    const [found, setFound] = useState(false);
    const [accSucc, setAccSucc] = useState(false);
    const accSuccHandle = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setAccSucc(false);
    };

    const handleClose2 = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setFound(false);
    };
    async function handleRegister(event: any) {
        if (firstNameAlert == false
            && lastNameAlert == false
            && emailAlert == false
            && passAlert == false
            && passSecondAlert == false
            && userRegister.address != ""
            && userRegister.email != ""
            && userRegister.firstName != ""
            && userRegister.lastName != ""
            && userRegister.password != ""
        ) {
            event.preventDefault();

            if (users.find((elem: any) => elem.email === userRegister.email)) {
                setFound(true);
            } else {
                getAxiosInstance()
                    .post("/user/saveUser", JSON.stringify(userRegister))
                    .then(() => {
                        getUsers();
                        setAccSucc(true);
                    })
            }
        }

    }

    return (
        <div className="registerform-container">
            <div className="register-wr">
                REGISTER
            </div>
            <div className="div-reg-form-row">
                {firstNameAlert ? <div style={{ color: "red" }}>*contains only letters, first capital</div> : <div></div>}
                <input
                    placeholder="FIRSTNAME"
                    onChange={(event: any) => {
                        if (nameRegex.test(event.target.value)) {
                            setUserRegister({ ...userRegister, firstName: event.target.value });
                            setFirstNameAlert(false);
                        } else {
                            setFirstNameAlert(true);
                        }

                    }}
                />
            </div>
            <div className="div-reg-form-row">
                {lastNameAlert ? <div style={{ color: "red" }}>*contains only letters, first capital</div> : <div></div>}
                <input
                    placeholder="LASTNAME"
                    onChange={(event: any) => {
                        if (nameRegex.test(event.target.value)) {
                            setUserRegister({ ...userRegister, lastName: event.target.value });
                            setLastNameAlert(false);
                        } else {
                            setLastNameAlert(true);
                        }

                    }}
                />
            </div>
            <div className="div-reg-form-row">
                <div></div>
                <input
                    placeholder="ADDRESS"
                    onChange={(event: any) => {
                        setUserRegister({ ...userRegister, address: event.target.value })
                    }}
                />
            </div>
            <div className="div-reg-form-row">
                {emailAlert ? <div style={{ color: "red" }}>*not a valid email</div> : <div></div>}
                <input
                    placeholder="EMAIL"
                    onChange={(event: any) => {
                        if (emailregex.test(event.target.value)) {
                            setUserRegister({ ...userRegister, email: event.target.value });
                            setEmailAlert(false);
                        } else {
                            setEmailAlert(true);
                        }

                    }}
                />
            </div>
            <div className="div-reg-form-row">
                {passAlert ? <div style={{ color: "red" }}>*1capitalLetter,1special,1number,min 7 total</div> : <div></div>}
                <input
                    placeholder="PASSWORD"
                    type="password"
                    onChange={(event: any) => {
                        if (passwordRegex.test(event.target.value)) {
                            setUserRegister({ ...userRegister, password: event.target.value });
                            setPassAlert(false);
                        } else {
                            setPassAlert(true);
                        }

                    }}
                />
            </div>
            <div className="div-reg-form-row">
                {passSecondAlert ? <div>*passwords don't match</div> : <div></div>}
                <input
                    placeholder="CONFIRM PASSWORD"
                    type="password"
                    onChange={(event: any) => {
                        if (userRegister.password === event.target.value) {
                            setPassSecondAlert(false);
                        } else {
                            setPassSecondAlert(true);
                        }
                    }}
                />
            </div>
            <button
                className="regBtn"
                onClick={handleRegister}>
                REGISTER
            </button>
            <Snackbar open={found} autoHideDuration={3000} onClose={handleClose2}>
                <Alert onClose={handleClose2} severity="error" sx={{ width: "100%" }}>
                    Email already used!
                </Alert>
            </Snackbar>
            <Snackbar open={accSucc} autoHideDuration={3000} onClose={accSuccHandle}>
                <Alert onClose={accSuccHandle} severity="success" sx={{ width: "100%" }}>
                    Account created!
                </Alert>
            </Snackbar>

        </div>
    )
}

export default RegisterForm;