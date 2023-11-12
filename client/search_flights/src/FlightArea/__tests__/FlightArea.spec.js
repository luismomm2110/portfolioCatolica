import userEvent from '@testing-library/user-event'
import {render, screen, waitFor} from '@testing-library/react'
import FlightArea from '../FlightArea'
import {searchAirportGateway} from '../gateways/searchAirportGateway'
import {cityOfOriginGateway} from '../gateways/cityOfOriginGateway'

jest.mock('../gateways/searchAirportGateway')
jest.mock('../gateways/cityOfOriginGateway')


describe(('FlightArea'), () => {
    it('Should change initially the heading with "Selecione a origem"', () => {
        render(<FlightArea/>)

        expect(screen.getByRole('heading', {name: 'Selecione a origem'})).toBeInTheDocument()
    })

    it('Should not display the airports input before finding an origin airport', () => {
        render(<FlightArea/>)

        expect(screen.queryByRole('textbox', {name: 'Aeroporto de destino:'})).not.toBeInTheDocument()
    })

    it('should call the cityOfOrigin gateway when the submit an origin', () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: []
        })
        render(<FlightArea/>);

        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(cityOfOriginGateway).toHaveBeenCalledWith("São Paulo")
    })

    it('should not display the Find Airports section before finding airports', () => {
        searchAirportGateway.mockResolvedValueOnce({
            data: []
        })
        render(<FlightArea/>);

        const input2 = screen.getByRole('textbox', {name: 'Cidade de origem:'})
        userEvent.type(input2, 'São Paulo')

        expect(screen.queryByRole('textbox', {name: 'Aeroporto de destino:'})).not.toBeInTheDocument()
    })

    it('should call the searchAirports gateway when the submit an origin and destination airport', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
        searchAirportGateway.mockResolvedValueOnce({
            data: []
        })
        render(<FlightArea/>);

        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'Varsovia')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(searchAirportGateway).toHaveBeenCalledWith("Varsovia")
    })

    it('Should render the received airports and distance as checkbox', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea/>);

        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')

        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')).toBeInTheDocument()
        expect(await screen.findByLabelText('Aeroporto de Congonhas: 30 km')).toBeInTheDocument()
        expect(await screen.findByLabelText('Aeroporto de Viracopos: 80 km')).toBeInTheDocument()
    })

    it('Should display if there arent airports selected', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea/>);

        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(await screen.findByText('Nenhum aeroporto selecionado')).toBeInTheDocument()
    })

    it('Should display when there is one airport selected', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea/>);
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)

        expect(await screen.findByText('1 aeroporto selecionado')).toBeInTheDocument()
    })

    it('Should display when there is more than one airport selected', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea/>);
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        const checkbox2 = await screen.findByLabelText('Aeroporto de Congonhas: 30 km')
        userEvent.click(checkbox2)

        expect(await screen.findByText('2 aeroportos selecionados')).toBeInTheDocument()
    })

    test('Should remove the airport from the list when the user uncheck the checkbox', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea/>);
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        const checkbox2 = await screen.findByLabelText('Aeroporto de Congonhas: 30 km')
        userEvent.click(checkbox2)
        userEvent.click(checkbox2)

        expect(await screen.findByText('1 aeroporto selecionado')).toBeInTheDocument()
    })

    it('Should display an error when user try to select more than limit of airports', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea selectedAirportLimit={limit}/>);
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        const checkbox2 = await screen.findByLabelText('Aeroporto de Congonhas: 30 km')
        userEvent.click(checkbox2)

        expect(await screen.findByText('Você atingiu o limite de 1 aeroporto(s)')).toBeInTheDocument()
    })

    it('should disable unchecked checkboxes when user try to select more than limit of airports', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea selectedAirportLimit={limit}/>);
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)

        expect(screen.getByLabelText('Aeroporto de Congonhas: 30 km')).toBeDisabled()
        expect(screen.getByLabelText('Aeroporto de Viracopos: 80 km')).toBeDisabled()
    })

    it('should not disable checked checkboxes when user try to select more than limit of airports', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea selectedAirportLimit={limit}/>);
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)

        expect(screen.getByLabelText('Aeroporto de Guarulhos: 0 km')).not.toBeDisabled()
    })

    it('Should allow user to select more airports when change airport', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea/>);
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
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
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea/>);
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)

        expect(await screen.findByText('Aeroporto de Guarulhos')).toBeInTheDocument()
    })

    it ('should display heading "selecione o destino" when the user select an origin', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
        render(<FlightArea/>);

        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo');
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(await screen.findByRole('heading', {name: 'Selecione o destino'})).toBeInTheDocument()
    })

    it ('should display heading "selecione os aeroportos" when the user selected an destiny', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
        searchAirportGateway.mockResolvedValueOnce({
            data: [
                {
                    'code': 'GRU',
                    name: 'Aeroporto de Guarulhos',
                    city: 'São Paulo',
                    country: 'Brasil',
                    distance: 0
                }
            ]
        })
        render(<FlightArea/>);

        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo');
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo');
        userEvent.type(screen.getByRole('button', {name: 'Submit'}));

        expect(await screen.findByRole('heading', {name: 'Selecione os aeroportos'})).toBeInTheDocument()
    })

    it('Should remove the airport from the list when the user click on the remove button', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea/>);
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        userEvent.click(screen.getByRole('button', {name: 'X'}))

        expect(await screen.findByText('Nenhum aeroporto selecionado')).toBeInTheDocument()
        expect(screen.queryByText('Aeroporto de Guarulhos')).not.toBeInTheDocument()
    })

    it('Should uncheck an airport from the checkboxes when the user click on the remove button', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea/>);
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        userEvent.click(screen.getByRole('button', {name: 'X'}))

        await waitFor(() => {
            expect(screen.getByLabelText('Aeroporto de Guarulhos: 0 km')).not.toBeChecked()
        })
    })

    it('Should keep the submit button text to "Submit" when the user doesnt have any selected airports', async () => {
        cityOfOriginGateway.mockResolvedValueOnce({
            data: 'São Paulo'
        })
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
        render(<FlightArea/>);
        userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));
        userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'São Paulo')
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        const checkbox = await screen.findByLabelText('Aeroporto de Guarulhos: 0 km')
        userEvent.click(checkbox)
        userEvent.click(screen.getByRole('button', {name: 'X'}))

        await waitFor(() => {
            expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument()
        })
        expect(screen.queryByRole('button', {name: 'Salvar'})).not.toBeInTheDocument()
    })

    it('Should introduce a data input when the user select at least one airport', async () => {
            cityOfOriginGateway.mockResolvedValueOnce({
                data: 'São Paulo'
            })
            const limit = 1;
            searchAirportGateway.mockResolvedValueOnce({
                data: [
                    {
                        code: 'MAD',
                        name: 'Aeroporto de Madrid',
                        city: 'Madrid',
                        country: 'Espanha',
                        distance: 0
                    }
                ]
            })
            render(<FlightArea selectedAirportLimit={limit}/>);
            userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo');
            userEvent.click(screen.getByRole('button', {name: 'Submit'}));
            userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'Madrid');
            userEvent.click(screen.getByRole('button', {name: 'Submit'}));

            const checkbox = await screen.findByLabelText('Aeroporto de Madrid: 0 km')
            userEvent.click(checkbox)

            expect(await screen.findByText('Data do Voo:')).toBeInTheDocument()
        }
    )

    it('Should change a data input when the user select at least one airport', async () => {
            cityOfOriginGateway.mockResolvedValueOnce({
                data: 'São Paulo'
            })
            const limit = 30;
            searchAirportGateway.mockResolvedValueOnce({
                data: [
                    {
                        code: 'MAD',
                        name: 'Aeroporto de Madrid',
                        city: 'Madrid',
                        country: 'Espanha',
                        distance: 0
                    }
                ]
            })
            render(<FlightArea selectedAirportLimit={limit}/>);
            userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo');
            userEvent.click(screen.getByRole('button', {name: 'Submit'}));
            userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'Madrid');
            userEvent.click(screen.getByRole('button', {name: 'Submit'}));
            const checkbox = await screen.findByLabelText('Aeroporto de Madrid: 0 km')
            userEvent.click(checkbox)

            const dateInput = screen.getByLabelText(/Data do Voo/i);
            userEvent.type(dateInput, '2021-10-10');

            expect(screen.getByRole('textbox', {name: 'Data do Voo:'})).toHaveValue('2021-10-10')
        }
    )

    it('should display the price input when the user select at least one airport', async () => {
            cityOfOriginGateway.mockResolvedValueOnce({
                data: 'São Paulo'
            })
            const limit = 30;
            searchAirportGateway.mockResolvedValueOnce({
                data: [
                    {
                        code: 'MAD',
                        name: 'Aeroporto de Madrid',
                        city: 'Madrid',
                        country: 'Espanha',
                        distance: 0
                    }
                ]
            })
            render(<FlightArea selectedAirportLimit={limit}/>);
            userEvent.type(screen.getByRole('textbox', {name: 'Cidade de origem:'}), 'São Paulo');
            userEvent.click(screen.getByRole('button', {name: 'Submit'}));
            userEvent.type(await screen.findByRole('textbox', {name: 'Aeroporto de destino:'}), 'Madrid');
            userEvent.click(screen.getByRole('button', {name: 'Submit'}));

            const checkbox = await screen.findByLabelText('Aeroporto de Madrid: 0 km')
            userEvent.click(checkbox)

            expect(await screen.findByLabelText('Preço máximo:')).toBeInTheDocument()
            expect(await screen.findByPlaceholderText('Sem preço máximo:')).toBeInTheDocument()
    })
})