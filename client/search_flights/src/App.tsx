import React from 'react';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import {PaginaInicial} from './PaginaInicial/PaginaInicial'
import ErrorPage from "./ErrorPage/ErrorPage";

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <PaginaInicial/>,
            errorElement: <ErrorPage/>
        }
    ]);

    return  <RouterProvider router={router} />
}

export default App;
