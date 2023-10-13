import React from 'react';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import {PaginaInicial} from './PaginaInicial/PaginaInicial'
import ErrorPage from "./ErrorPage/ErrorPage";
import {useAuth} from "./auth/authProvider";
import {ProtectedRoute} from "./auth/ProtectedRoute";


const App = () => {
    const { token } = useAuth();

    const routesForAuthenticatedUsers = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/',
                    element: <div>Authenticated</div>,
                }
            ]
        }
    ];

    const routesForUnauthenticatedUsers = [
        {
            path: '/',
            element: <PaginaInicial/>,
            errorElement: <ErrorPage/>
        }
    ];

    const router = createBrowserRouter(
        token ? routesForAuthenticatedUsers : routesForUnauthenticatedUsers
    );

    return  <RouterProvider router={router} />
}

export default App;
