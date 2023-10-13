export const loginGateway = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    })
    return await response.json()
}
