import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import CreateFlightArea from '../createFlightArea'
import {searchAirportGateway} from '../gateways/searchAirportGateway'
import {cityOfOriginGateway} from '../gateways/cityOfOriginGateway'

jest.mock('../gateways/searchAirportGateway')
jest.mock('../gateways/cityOfOriginGateway')


describe(('createFlightArea'), () => {
    it('Should show an error when user try to create a flight area with a name longer than 50 characters', () => {
        render(<CreateFlightArea/>)

        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos do Leste Asiático'.repeat(5))

        expect(screen.getByText('O nome da área de voo deve ter no máximo 50 caracteres')).toBeInTheDocument()
    })

    it('Should not display the airports input before finding an origin airport', () => {
        render(<CreateFlightArea/>)

        expect(screen.queryByRole('textbox', {name: 'Aeroporto de destino:'})).not.toBeInTheDocument()
    })

    it ('should call the cityOfOrigin gateway when the submit an origin',  () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: []
        })
        render(<CreateFlightArea />);

        userEvent.type(screen.getByRole('textbox', {name: 'Nome da área de voo:'}), 'Aeroportos do Leste Europeu')
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(cityOfOriginGateway).toHaveBeenCalledWith("São Paulo")
    })

    it('should display error when returned while submitting an origin',  async () => {
        cityOfOriginGateway.mockRejectedValueOnce({
            response: {
                data: {
                    message: 'Cidade não encontrada'
                }
            }
        })

        render(<CreateFlightArea />);

        userEvent.type(screen.getByRole('textbox', {name: 'Nome da área de voo:'}), 'Aeroportos do Leste Europeu')
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(await screen.findByText('Cidade não encontrada')).toBeInTheDocument()
    })

    it ('should not display the Find Airports section before finding airports',  () => {
        searchAirportGateway.mockResolvedValueOnce({
            data: []
        })
        render(<CreateFlightArea />);

        const input = screen.getByRole('textbox', {name: 'Nome da área de voo:'})
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Cidade de origem:'})
        userEvent.type(input2, 'São Paulo')

        expect(screen.queryByRole('textbox', {name: 'Aeroporto de destino:'})).not.toBeInTheDocument()
    })

    it ('should call the searchAirports gateway when the submit an origin and destination airport',  () => {
        searchAirportGateway.mockResolvedValueOnce({
            data: []
        })
        render(<CreateFlightArea />);

        userEvent.type(screen.getByRole('textbox', {name: 'Nome da área de voo:'}), 'Aeroportos do Leste Europeu')
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.type(screen.getByRole('textbox', {name: 'Aeroporto de destino:'}), 'Varsovia')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(searchAirportGateway).toHaveBeenCalledWith("Varsovia")
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
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
        userEvent.type(input2, 'São Paulo')

        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')).toBeInTheDocument()
        expect(await screen.findByLabelText('Aeroporto de Congonhas: 30 km')).toBeInTheDocument()
        expect(await screen.findByLabelText('Aeroporto de Viracopos: 80 km')).toBeInTheDocument()
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
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
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
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
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
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
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
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
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
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
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
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
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
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
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
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        const input3 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
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

    it('Should display the selected airports as a list', async () => {
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
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)

        expect(await screen.findByText('Aeroporto de Guarulhos')).toBeInTheDocument()
    })

    it ('Should remove the airport from the list when the user click on the remove button', async () => {
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
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.type(input, 'Aeroportos de São Paulo')
        const input2 = screen.getByRole('textbox', {name: 'Aeroporto de destino:'})
        userEvent.type(input2, 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        userEvent.click(screen.getByRole('button', {name: 'X'}))

        expect(await screen.findByText('Nenhum aeroporto selecionado')).toBeInTheDocument()
        expect(screen.queryByText('Aeroporto de Guarulhos')).not.toBeInTheDocument()
    })
})
