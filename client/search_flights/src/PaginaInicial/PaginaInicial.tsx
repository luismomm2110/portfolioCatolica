import React, {useState} from "react";
import Login from "./Login/Login";
import { SignUp } from "./SignUp/SignUp";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/authProvider";

export const PaginaInicial: React.FC = () => {
    const { setToken } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();


    return (
        <div>
            {isLogin ?
                <Login
                    onShowSignUp={() => setIsLogin(false)}
                    setToken={setToken}
                    navigate={navigate}
                /> :
                <SignUp onShowLogin={() => setIsLogin(true)}/>
            }
        </div>
    )
}

