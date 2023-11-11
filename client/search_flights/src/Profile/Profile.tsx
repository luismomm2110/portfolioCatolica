import React, {useEffect} from 'react';
import {useAuth} from "../auth/authProvider";
import {useNavigate} from "react-router-dom";
import {ReusableButton} from "../systemDesign/Button/ReusableButton";
import './Profile.css'
import flightAreaGateway from "./gateways/flightAreaGateway";
import {FlightArea} from "../createFlightArea/types";
import CardFlightArea from "../CardFlightArea/CardFlightArea";


const Profile: React.FC = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate()
    const [flightAreas, setFlightAreas] = React.useState<FlightArea[]>([])

    const logout = () => {
        setToken(null);
        navigate('/')
    }

    useEffect(() => {
        flightAreaGateway().then((response) => {
            setFlightAreas(response)
        })
    }, []);

    const listFlightAreas = () => {
        return flightAreas.map((flightArea) => {
            return (
                <li key={flightArea._id}>
                    <CardFlightArea flightArea={flightArea} />
                </li>
            )
        })
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
                    <ul>
                        {listFlightAreas()}
                    </ul>
                </main>
            </div>
        </>
    );
};

export default Profile;
