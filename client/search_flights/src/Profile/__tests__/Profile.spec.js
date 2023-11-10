import {render, screen} from '@testing-library/react';
import Profile from '../Profile'
import AuthProvider from '../../auth/authProvider'
import {Router} from 'react-router-dom'
import flightAreaGateway from '../gateways/flightAreaGateway'

const renderWithAuthProvider = () => {

    return render(
        <AuthProvider> <Router
                navigator={{}}
                location={{pathname: '/profile'}}
                routes={[]}
                >
                <Profile/>
            </Router>
        </AuthProvider>
    )
}

jest.mock('../gateways/flightAreaGateway')

describe('Profile', () => {
    it('Should render the Profile screen', () => {
        renderWithAuthProvider()

        expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('Should have the logout button', () => {
        renderWithAuthProvider()

        expect(screen.getByText('Logout')).toBeInTheDocument();
    })

    it('Should fetch the Flight Area data', () => {
        flightAreaGateway.mockResolvedValueOnce({data: {}})

        renderWithAuthProvider()

        expect(flightAreaGateway).toHaveBeenCalled()
    })
})
