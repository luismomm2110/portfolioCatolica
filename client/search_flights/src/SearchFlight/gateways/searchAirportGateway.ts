export const searchAirportGateway = async (airportName: string, limit: string = '30') => {
    const url =  new URL(`${process.env.REACT_APP_API_URL}/airports`)
    url.searchParams.append('city', airportName)
    url.searchParams.append('limit', limit)

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.status === 404) throw new Error('Aeroporto não encontrado')
    if (!response.ok) throw new Error('Error fetching airports')
    return await response.json()
}
