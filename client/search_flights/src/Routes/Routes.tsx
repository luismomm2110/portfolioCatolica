import React from "react";
import {useAuth} from "../auth/authProvider";
import {ProtectedRoute} from "../auth/ProtectedRoute";
import {PaginaInicial} from "../PaginaInicial/PaginaInicial";
import ErrorPage from "../ErrorPage/ErrorPage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

export const Routes: React.FC = () => {

    const {token} = useAuth();

    const routesForAuthenticatedUsers = [
        {
            path: '/',
            element: <ProtectedRoute/>,
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

    return <RouterProvider router={router}/>

}