export const searchAirportGateway = async (cityOfOrigin: string, airportName: string, limit: string = '30') => {
    const url =  new URL('http://localhost:5001/airports')
    url.searchParams.append('cityOfOrigin', cityOfOrigin)
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
