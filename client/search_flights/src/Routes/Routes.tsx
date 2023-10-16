import React from "react";
import {useAuth} from "../auth/authProvider";
import {ProtectedRoute} from "../auth/ProtectedRoute";
import {PaginaInicial} from "../PaginaInicial/PaginaInicial";
import ErrorPage from "../ErrorPage/ErrorPage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Profile from "../Profile/Profile";

export const Routes: React.FC = () => {

    const {token} = useAuth();

    const routesForAuthenticatedUsers = [
        {
            path: '/',
            element: <ProtectedRoute/>,
            children: [
                {
                    path: '/profile',
                    element: <Profile />,
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