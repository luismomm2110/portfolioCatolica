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

    it('Should contain the Flight Area data', async () => {
        const flightAreaData = [
            {
                _id: 1,
                name: 'Flight Area 1',
                airports: [],
                travel_agent_id: 1,
                city_origin: 'City 1'
            },
            {
                _id: 2,
                name: 'Flight Area 2',
                airports: [],
                travel_agent_id: 1,
                city_origin: 'City 2',
            }
        ]
        flightAreaGateway.mockResolvedValueOnce(flightAreaData)

        renderWithAuthProvider()

        expect(await screen.findByText('Flight Area 1')).toBeInTheDocument()
        expect(await screen.findByText('Flight Area 2')).toBeInTheDocument()
    })
})

