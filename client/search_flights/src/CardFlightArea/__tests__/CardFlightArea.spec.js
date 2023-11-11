import {render, screen, waitFor} from '@testing-library/react';
import CardFlightArea from '../CardFlightArea'

Object.assign(navigator, {
    clipboard: {
        writeText: jest.fn(),
    }
})

describe('CardFlightArea', () => {
    it('Should render the Card with given flight area name', () => {
        const flightArea = {
            name: "Aeroportos do Leste Asiático",
        }
        render(<CardFlightArea flightArea={flightArea}/>)

        expect(screen.getByText('Aeroportos do Leste Asiático')).toBeInTheDocument();
    });

    it('Should render a Excluir button', () => {
        const flightArea = {
            name: "Aeroportos do Leste Asiático",
        }
        render(<CardFlightArea flightArea={flightArea}/>)

        expect(screen.getByText('Excluir')).toBeInTheDocument();
    })

    it('Should render a Compartilhar button', () => {
        const flightArea = {
            name: "Aeroportos do Leste Asiático",
        }
        render(<CardFlightArea flightArea={flightArea}/>)

        expect(screen.getByText('Compartilhar')).toBeInTheDocument();
    })

    it('Should copy the link to clipboard when click on Compartilhar button', async () => {
        const flightArea = {
            name: "Aeroportos do Leste Asiático",
            _id: '123'
        }
        const url = `http://localhost:3000/flight_area/${flightArea._id}`
        render(<CardFlightArea flightArea={flightArea} onExcluir={() => {}}/>)

        const button = screen.getByText('Compartilhar');
        button.click();

        await waitFor(
            () => expect(navigator.clipboard.writeText).toHaveBeenCalled()
        );
    })
})

