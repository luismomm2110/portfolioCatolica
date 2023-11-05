export const cityOfOriginGateway = async (city: string) => {
    const url =  new URL('http://localhost:5001/cities')
    url.searchParams.append('city', city)

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}
