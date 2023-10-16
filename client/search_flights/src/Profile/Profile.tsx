import React from 'react';
import {useAuth} from "../auth/authProvider";
import {useNavigate} from "react-router-dom";
import {ReusableButton} from "../systemDesign/Button/ReusableButton";
import './Profile.css'


const Profile: React.FC = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate()
    const logout = () => {
        setToken(null);
        navigate('/')
    }

    return (
        <>
            <header className={'header'}>
                <h1>Profile</h1>
                <ReusableButton
                    description={'Logout'}
                    label={'Logout'}
                    callback={logout}
                />
            </header>
            <main className={'conteudo-principal'}>
                <ReusableButton
                    description={'Criar área de voos'}
                    label={'Criar área de voos'}
                    callback={() => navigate('/createFlightArea')}
                />
            </main>
        </>
    );
};

export default Profile;
