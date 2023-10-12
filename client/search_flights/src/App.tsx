import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import {PaginaInicial} from './PaginaInicial/PaginaInicial'

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <PaginaInicial/>
        }
    ]);

    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
           <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default App;
