import React from "react";
import Login from "./Login";
import { SignUp } from "./SignUp";

export const PaginaInicial: React.FC = () => {
    const [isLogin, setIsLogin] = React.useState(true);

   return (
        <div>
            { isLogin ? <Login onShowSignUp={() => setIsLogin(false)} />  :
                <SignUp />
            }
        </div>
    )
}

