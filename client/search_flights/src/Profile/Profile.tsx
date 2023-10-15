import React from 'react';
import logoutGateway from "./gateway";


const Profile: React.FC = () => {
    const logout = () => {
        logoutGateway().then(() => {
            console.log('logged out')
        })
    }

    return (
        <>
            <header>
                <button onClick={logout}>
                    Logout
                </button>
            </header>
            <main>
                <h1>Profile</h1>
            </main>
        </>
    );
};

export default Profile;
