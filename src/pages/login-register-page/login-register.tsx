import { useState } from "react";
import "./login-register.scss";
import LoginForm from "../../components/loginForm/loginForm";
import RegisterForm from "../../components/registerForm/registerFrom";
const LoginRegister: React.FC = (): JSX.Element => {
    const [showLoginOrRegister, setShowLoginOrRegister] = useState(false)

    const changeToLogin = () => {
        setShowLoginOrRegister(true);
    }
    const changeToRegister = () => {
        setShowLoginOrRegister(false);
    }
    return (
        <div className="login-register-page">
            <div className="form-container-login">
                <div className="logreg-choose">
                    <button className="logOrRegBtn"
                        onClick={changeToLogin}
                        style={{ backgroundColor: !showLoginOrRegister ? "#857e61" : "#b7a196" }}
                    >
                        LOGIN
                    </button>
                    <button className="logOrRegBtn"
                        onClick={changeToRegister}
                        style={{ backgroundColor: showLoginOrRegister ? "#857e61" : "#b7a196" }}
                    >
                        REGISTER
                    </button>
                </div>
                <div className="forms-zone">
                    {showLoginOrRegister ?
                        <LoginForm /> :
                        <RegisterForm />}
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default LoginRegister;