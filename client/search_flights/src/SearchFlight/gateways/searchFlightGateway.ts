export const searchFlightGateway = async (cityOrigin: string, destinations: string[], price: string, departure: string)=> {
    const url =  new URL(`${process.env.REACT_APP_API_URL}/flights`)
    url.searchParams.append('city_origin', cityOrigin)
    for (let i = 0; i < destinations.length; i++) {
        url.searchParams.append('destination', destinations[i])
    }
    url.searchParams.append('price', String(price))
    url.searchParams.append('departure', departure)

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.status === 404) throw new Error('Nenhum voo encontrado.')
    if (!response.ok) throw new Error('Error fetching flight')
    return await response.json()
}
