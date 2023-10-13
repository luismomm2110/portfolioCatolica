import axios from 'axios';

export const loginGateway = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:5001/login', {
        email,
        password
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}
