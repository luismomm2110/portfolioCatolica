export const searchFlightGateway = async (origin: string, flights: string[], price: string, date: string)=> {
    const url =  new URL('http://localhost:5001/flights')
    url.searchParams.append('origin', origin)
    for (let i = 0; i < flights.length; i++) {
        url.searchParams.append('flights', flights[i])
    }
    url.searchParams.append('price', String(price))
    url.searchParams.append('date', date)

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.status === 404) throw new Error('Nenhum voo encontrado')
    if (!response.ok) throw new Error('Error fetching flight')
    return await response.json()
}
