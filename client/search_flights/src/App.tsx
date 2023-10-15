import React from 'react';
import AuthProvider from "./auth/authProvider";
import {Routes} from "./Routes/Routes";


const App = () => {
    return (
        <AuthProvider>
            <Routes/>
        </AuthProvider>
    );
}

export default App;
