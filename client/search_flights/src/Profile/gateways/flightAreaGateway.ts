import {FlightArea} from "../../FlightArea/types";

const flightAreaGateway = async (): Promise<FlightArea[]> => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5001/flight_area', {
        method: 'GET',
        headers: {
            'Authorization': token ?? '',
        }
    });
    return await response.json();
}

export default flightAreaGateway;
