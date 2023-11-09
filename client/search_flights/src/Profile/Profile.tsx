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
            <div className={'profile'}>
                <header>
                    <h1>Profile</h1>
                    <ReusableButton
                        description={'Logout'}
                        label={'Logout'}
                        callback={logout}
                    />
                </header>
                <main>
                    <ReusableButton
                        description={'Criar área de voos'}
                        label={'Criar área de voos'}
                        callback={() => navigate('/createFlightArea')}
                    />
                </main>
            </div>
        </>
    );
};

export default Profile;
