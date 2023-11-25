export const loginGateway = async (email: string, password: string) => {
    const url =  new URL(`${process.env.REACT_APP_API_URL}/login`)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    })
    return await response.json()
}