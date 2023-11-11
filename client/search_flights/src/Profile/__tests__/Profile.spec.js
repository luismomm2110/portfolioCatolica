import {render, screen} from '@testing-library/react';
import Profile from '../Profile'
import AuthProvider from '../../auth/authProvider'
import {Router} from 'react-router-dom'
import flightAreaGateway from '../gateways/flightAreaGateway'
import {deleteFlightAreaGateway} from '../gateways/deleteFlightAreaGateway'

const renderWithAuthProvider = () => {

    return render(
        <AuthProvider>
            <Router
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
jest.mock('../gateways/deleteFlightAreaGateway')

describe('Profile', () => {
    it('Should render the Profile screen', () => {
        flightAreaGateway.mockResolvedValueOnce({data: {}})

        renderWithAuthProvider()

        expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('Should have the logout button', () => {
        flightAreaGateway.mockResolvedValueOnce({data: {}})

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
        flightAreaGateway.mockResolvedValue(flightAreaData)

        renderWithAuthProvider()

        expect(await screen.findByText('Flight Area 1')).toBeInTheDocument()
        expect(await screen.findByText('Flight Area 2')).toBeInTheDocument()
    })

    it('should call the delete flight area function when the delete button is clicked', async () => {
        const flightAreaId = '123'
        const flightAreaData = [
            {
                _id: flightAreaId,
                name: 'Flight Area 1',
                airports: [],
                travel_agent_id: 1,
                city_origin: 'City 1'
            },
        ]
        flightAreaGateway.mockResolvedValue(flightAreaData)
        deleteFlightAreaGateway.mockResolvedValue([])
        renderWithAuthProvider()

        const deleteButton = await screen.findByText('Excluir')
        deleteButton.click()

        expect(deleteFlightAreaGateway).toHaveBeenCalledWith(flightAreaId)
    })
})

