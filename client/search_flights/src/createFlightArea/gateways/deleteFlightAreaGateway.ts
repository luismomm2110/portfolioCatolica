export const deleteFlightArea = async (_id: string) => {
    const url =  new URL('http://localhost:5001/flight_areas')

    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({_id})
    })
    if (response.status === 404) throw new Error('Area de voo não encontrada')
    if (!response.ok) throw new Error('Error fetching flight areas')
    return await response.json()
}
