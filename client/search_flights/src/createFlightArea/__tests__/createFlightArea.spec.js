import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import CreateFlightArea from '../createFlightArea'
import Login from '../../PaginaInicial/Login/Login'

describe(('createFlightArea'), () => {
    it('should give a name to the flight area', () => {
        render(<CreateFlightArea/>)

        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos do Leste Asiático')

        expect(screen.getByRole('textbox', {name: 'Nome da área de voo:'})).toHaveValue(
            'Aeroportos do Leste Asiático');
    })

    it('Should show an error when user try to create a flight area with a name longer than 50 characters', () => {
        render(<CreateFlightArea/>)

        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos do Leste Asiático'.repeat(5))

        expect(screen.getByText('O nome da área de voo deve ter no máximo 50 caracteres')).toBeInTheDocument()
    })

    it('Should accept an origin airport', () => {
        render(<CreateFlightArea/>)

        const input = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input, 'Aeroporto de Guarulhos')

        expect(screen.getByRole('textbox', {name: 'Aeroporto de origem:'})).toHaveValue(
            'Aeroporto de Guarulhos');
    })

    it ('should call the searchAirports gateway when the submit an airport name',  () => {
        global.fetch = jest.fn(() => {
                return Promise.resolve({
                    json: () => Promise.resolve({}),
                })
            }
        );
        render(<CreateFlightArea />);

        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos do Leste Asiático')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'Aeroporto de Guarulhos')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(global.fetch).toHaveBeenCalledTimes(1);
    })
})