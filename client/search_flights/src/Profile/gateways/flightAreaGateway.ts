import {TripGoal} from "../../SearchFlight/types";

const flightAreaGateway = async (): Promise<TripGoal[]> => {
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
