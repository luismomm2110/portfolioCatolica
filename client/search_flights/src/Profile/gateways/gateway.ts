const logoutGateway = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    await fetch('/http://localhost:5001/logout', {
        method: 'POST',
        headers: {
            'Authorization': token ?? '',
        }
    });
}

export default logoutGateway;