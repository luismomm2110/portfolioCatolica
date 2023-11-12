import React, {useEffect} from 'react';
import {useAuth} from "../auth/authProvider";
import {useNavigate} from "react-router-dom";
import {ReusableButton} from "../systemDesign/Button/ReusableButton";
import './Profile.css'
import flightAreaGateway from "./gateways/flightAreaGateway";
import {FlightArea} from "../FlightArea/types";
import CardFlightArea from "../CardFlightArea/CardFlightArea";
import {deleteFlightAreaGateway} from "./gateways/deleteFlightAreaGateway";


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

    const handleExcluir = (deletedFlightArea: FlightArea) => {
        deleteFlightAreaGateway(deletedFlightArea._id).then(() => {
                const newFlightAreas = flightAreas.filter((flightArea) =>
                    flightArea._id !== deletedFlightArea._id)
                setFlightAreas(newFlightAreas)
            }
    )};

    const listFlightAreas = () => {
        return flightAreas.map((flightArea) => {
            return (
                <li key={flightArea._id}>
                    <CardFlightArea
                        flightArea={flightArea}
                        onExcluir={handleExcluir}/>
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
                        callback={() => navigate('/FlightArea')}
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
