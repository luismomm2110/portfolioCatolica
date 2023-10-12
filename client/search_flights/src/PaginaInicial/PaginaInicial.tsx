import React from "react";
import Login from "./Login/Login";
import { SignUp } from "./SignUp/SignUp";

export const PaginaInicial: React.FC = () => {
    const [isLogin, setIsLogin] = React.useState(true);

   return (
        <div>
            { isLogin ? <Login onShowSignUp={() => setIsLogin(false)} />  :
                <SignUp onShowLogin={() => setIsLogin(true)} />
            }
        </div>
    )
}

