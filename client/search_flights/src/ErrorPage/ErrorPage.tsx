import React from "react";
import {isRouteErrorResponse, useRouteError} from 'react-router-dom'
import './ErrorPage.css'

const ErrorPage: React.FC = () => {
    const error: any = useRouteError() // Add appropriate type here

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {


            return (
                <div
                    className={'errorPage'}
                >
                    <h1>Oops!</h1>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i>{error.statusText || error.data.message}</i>
                    </p>
                </div>
            )
        }
    }

    return <div>Erro</div>
}


export default ErrorPage
