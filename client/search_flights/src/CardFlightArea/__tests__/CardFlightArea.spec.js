import {render, screen} from '@testing-library/react';
import CardFlightArea from '../CardFlightArea'

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
})

