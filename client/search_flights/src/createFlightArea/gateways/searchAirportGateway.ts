export const searchAirportGateway = async (airportName: string) => {
    const response = await fetch('http://localhost:5001/search_airport', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({airportName: airportName})
    })
    return await response.json()
}
