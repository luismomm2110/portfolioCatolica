import {render, screen} from '@testing-library/react';


import {SignUp} from '../SignUp'


describe('SignUp', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => {
                return Promise.resolve({
                    json: () => Promise.resolve({}),
                })
            }
        );
    })

    it('should render the SignUp form', () => {
        render(<SignUp />);

        expect(screen.getByRole('heading', {name: 'Crie sua conta!'})).toBeInTheDocument();
    })
})