const flightAreaGateway = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    await fetch('/http://localhost:5001/flight_area', {
        method: 'GET',
        headers: {
            'Authorization': token ?? '',
        }
    });
}

export default flightAreaGateway;
