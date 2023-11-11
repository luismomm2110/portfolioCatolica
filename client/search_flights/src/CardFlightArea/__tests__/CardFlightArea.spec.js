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
})

