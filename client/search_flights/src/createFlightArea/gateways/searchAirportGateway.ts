export const searchAirportGateway = async (airportName: string, limit: string = '3') => {
    const url =  new URL('http://localhost:5001/airports')
    url.searchParams.append('city', airportName)
    url.searchParams.append('limit', limit)

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}
