import React from "react";
import {useAuth} from "../auth/authProvider";
import {ProtectedRoute} from "../auth/ProtectedRoute";
import {PaginaInicial} from "../PaginaInicial/PaginaInicial";
import ErrorPage from "../ErrorPage/ErrorPage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Profile from "../Profile/Profile";
import FlightArea from "../FlightArea/FlightArea";

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
                },
                {
                    path: '/FlightArea',
                    element: <FlightArea/>,
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