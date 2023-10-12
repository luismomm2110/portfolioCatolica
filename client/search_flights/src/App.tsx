import React from 'react';
import * as ReactDOM from "react-dom/client";
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

    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
           <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default App;
