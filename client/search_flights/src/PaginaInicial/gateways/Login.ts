import axios from 'axios';

export const loginGateway = async (email: string, password: string) => {
    const response =
        await axios.post('http://localhost:5001/login', {
            email: email,
            password: password
        });
    return response.data;
};