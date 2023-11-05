import userEvent from '@testing-library/user-event'
import {render, screen, waitFor} from '@testing-library/react'
import CreateFlightArea from '../createFlightArea'
import {searchAirportGateway} from '../gateways/searchAirportGateway'

jest.mock('../gateways/searchAirportGateway')


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
        searchAirportGateway.mockResolvedValueOnce({
            data: []
        })
        render(<CreateFlightArea />);

        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(searchAirportGateway).toHaveBeenCalledWith('São Paulo')
    })

    it ('should not display the Find Airports section before finding airports',  () => {
        searchAirportGateway.mockResolvedValueOnce({
            data: []
        })
        render(<CreateFlightArea />);

        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')

        expect(screen.queryByRole('heading', {  name: /aeroportos encontrados/i})).not.toBeInTheDocument()
    })

    it('Should render the received airports and distance as checkbox', async () => {
        searchAirportGateway.mockResolvedValueOnce({
            data: [
                {
                    code: 'GRU',
                    name: 'Aeroporto de Guarulhos',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 0
                },
                {
                    'code': 'CGH',
                    name: 'Aeroporto de Congonhas',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 30
                },
                {
                    code: 'VCP',
                    name: 'Aeroporto de Viracopos',
                    municipality: 'Campinas',
                    country: 'Brasil',
                    distance: 80
                }
            ]
        })
        render(<CreateFlightArea />);

        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')

        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')).toBeInTheDocument()
        expect(await screen.findByLabelText('Aeroporto de Congonhas: 30 km')).toBeInTheDocument()
        expect(await screen.findByLabelText('Aeroporto de Viracopos: 80 km')).toBeInTheDocument()
    })

    it('Should display Contact Support when gateway returns an error', async () => {
        searchAirportGateway.mockRejectedValueOnce({
            data: []
        })
        render(<CreateFlightArea />);

        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(await screen.findByText('Contate o suporte')).toBeInTheDocument()
    })

    it('Should display if there arent airports selected', async () => {
        searchAirportGateway.mockResolvedValueOnce({
            data: [
                {
                    code: 'GRU',
                    name: 'Aeroporto de Guarulhos',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 0
                },
                {
                    'code': 'CGH',
                    name: 'Aeroporto de Congonhas',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 30
                },
                {
                    code: 'VCP',
                    name: 'Aeroporto de Viracopos',
                    municipality: 'Campinas',
                    country: 'Brasil',
                    distance: 80
                }
            ]
        })
        render(<CreateFlightArea />);

        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(await screen.findByText('Nenhum aeroporto selecionado')).toBeInTheDocument()
    })

    it('Should display when there is one airport selected', async () => {
        searchAirportGateway.mockResolvedValueOnce({
            data: [
                {
                    code: 'GRU',
                    name: 'Aeroporto de Guarulhos',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 0
                },
                {
                    'code': 'CGH',
                    name: 'Aeroporto de Congonhas',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 30
                },
                {
                    code: 'VCP',
                    name: 'Aeroporto de Viracopos',
                    municipality: 'Campinas',
                    country: 'Brasil',
                    distance: 80
                }
            ]
        })
        render(<CreateFlightArea />);
        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)

        expect(await screen.findByText('1 aeroporto selecionado')).toBeInTheDocument()
    })

    it('Should display when there is more than one airport selected', async () => {
        searchAirportGateway.mockResolvedValueOnce({
            data: [
                {
                    code: 'GRU',
                    name: 'Aeroporto de Guarulhos',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 0
                },
                {
                    'code': 'CGH',
                    name: 'Aeroporto de Congonhas',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 30
                },
                {
                    code: 'VCP',
                    name: 'Aeroporto de Viracopos',
                    municipality: 'Campinas',
                    country: 'Brasil',
                    distance: 80
                }
            ]
        })
        render(<CreateFlightArea />);
        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        const checkbox2 = await screen.findByLabelText('Aeroporto de Congonhas: 30 km')
        userEvent.click(checkbox2)

        expect(await screen.findByText('2 aeroportos selecionados')).toBeInTheDocument()
    })

    test('Should remove the airport from the list when the user uncheck the checkbox', async () => {
        searchAirportGateway.mockResolvedValueOnce({
            data: [
                {
                    code: 'GRU',
                    name: 'Aeroporto de Guarulhos',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 0
                },
                {
                    'code': 'CGH',
                    name: 'Aeroporto de Congonhas',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 30
                },
                {
                    code: 'VCP',
                    name: 'Aeroporto de Viracopos',
                    municipality: 'Campinas',
                    country: 'Brasil',
                    distance: 80
                }
            ]
        })
        render(<CreateFlightArea/>);
        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        const checkbox2 = await screen.findByLabelText('Aeroporto de Congonhas: 30 km')
        userEvent.click(checkbox2)
        userEvent.click(checkbox2)

        expect(await screen.findByText('1 aeroporto selecionado')).toBeInTheDocument()
    })

    it ('Should display an error when user try to select more than limit of airports', async () => {
        const limit = 1;
        searchAirportGateway.mockResolvedValueOnce({
            data: [
                {
                    code: 'GRU',
                    name: 'Aeroporto de Guarulhos',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 0
                },
                {
                    'code': 'CGH',
                    name: 'Aeroporto de Congonhas',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 30
                },
                {
                    code: 'VCP',
                    name: 'Aeroporto de Viracopos',
                    municipality: 'Campinas',
                    country: 'Brasil',
                    distance: 80
                }
            ]
        })
        render(<CreateFlightArea selectedAirportLimit={limit}/>);
        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        const checkbox2 = await screen.findByLabelText('Aeroporto de Congonhas: 30 km')
        userEvent.click(checkbox2)

        expect(await screen.findByText('Você atingiu o limite de 1 aeroporto(s)')).toBeInTheDocument()
    })

    it ('should disable unchecked checkboxes when user try to select more than limit of airports', async () => {
        const limit = 1;
        searchAirportGateway.mockResolvedValueOnce({
            data: [
                {
                    code: 'GRU',
                    name: 'Aeroporto de Guarulhos',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 0
                },
                {
                    'code': 'CGH',
                    name: 'Aeroporto de Congonhas',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 30
                },
                {
                    code: 'VCP',
                    name: 'Aeroporto de Viracopos',
                    municipality: 'Campinas',
                    country: 'Brasil',
                    distance: 80
                }
            ]
        })
        render(<CreateFlightArea selectedAirportLimit={limit}/>);
        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)

        expect(screen.getByLabelText('Aeroporto de Congonhas: 30 km')).toBeDisabled()
        expect(screen.getByLabelText('Aeroporto de Viracopos: 80 km')).toBeDisabled()
    })

    it ('should not disable checked checkboxes when user try to select more than limit of airports', async () => {
        const limit = 1;
        searchAirportGateway.mockResolvedValueOnce({
            data: [
                {
                    code: 'GRU',
                    name: 'Aeroporto de Guarulhos',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 0
                },
                {
                    'code': 'CGH',
                    name: 'Aeroporto de Congonhas',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 30
                },
                {
                    code: 'VCP',
                    name: 'Aeroporto de Viracopos',
                    municipality: 'Campinas',
                    country: 'Brasil',
                    distance: 80
                }
            ]
        })
        render(<CreateFlightArea selectedAirportLimit={limit}/>);
        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)

        expect(screen.getByLabelText('Aeroporto de Guarulhos: 0 km')).not.toBeDisabled()
    })

    it('Should allow user to select more airports when change airport', async () => {
        searchAirportGateway.mockResolvedValueOnce({
            data: [
                {
                    code: 'GRU',
                    name: 'Aeroporto de Guarulhos',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 0
                },
                {
                    'code': 'CGH',
                    name: 'Aeroporto de Congonhas',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 30
                },
                {
                    code: 'VCP',
                    name: 'Aeroporto de Viracopos',
                    municipality: 'Campinas',
                    country: 'Brasil',
                    distance: 80
                }
            ]
        })
        render(<CreateFlightArea/>);
        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        const input3 = screen.getByRole('textbox', {name: 'Aeroporto de origem:'})
        userEvent.clear(input3)
        userEvent.type(input3, 'João Pessoa')
        searchAirportGateway.mockResolvedValueOnce({
            data: [
                {
                    code: 'JPA',
                    name: 'Aeroporto de João Pessoa',
                    city: 'João Pessoa',
                    country: 'Brasil',
                    distance: 0
                },
            ]
        })
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        const checkbox2 = await screen.findByLabelText('Aeroporto de João Pessoa: 0 km')
        userEvent.click(checkbox2)

        expect(await screen.findByText('2 aeroportos selecionados')).toBeInTheDocument()
    })
})
