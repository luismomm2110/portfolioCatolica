import {Airport} from "../types";

export const createFlightAreaGateway = async (flightAreaName: string,
                                              cityOfOrigin: string,
                                              flightAreaOriginalAirport: string,
                                              selectedAirportsCodes: string[]) => {
    const url =  new URL('http://localhost:5001/flight_areas')

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            flightAreaName: flightAreaName,
            cityOfOrigin: cityOfOrigin,
            flightAreaOriginalAirport: flightAreaOriginalAirport,
            selectedAirports: selectedAirportsCodes
        })})
    if (response.status === 404) throw new Error('Aeroporto não encontrado')
    if (response.status !== 201) throw new Error('Error creating area')
    return await response.json()
}
