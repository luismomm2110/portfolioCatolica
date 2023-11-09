export const cityOfOriginGateway = async (city: string) => {
    const url =  new URL('http://localhost:5001/cities')
    console.log(city)
    url.searchParams.append('city', city)

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    console.log(response)
    if (response.status === 404) throw new Error('Cidade não encontrada')
    if (!response.ok) throw new Error('Error fetching cities')
    return await response.json()
}
