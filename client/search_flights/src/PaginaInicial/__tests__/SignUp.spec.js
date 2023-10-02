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

    it('should render the email, password and name fields', () => {
        render(<SignUp />);

        expect(screen.getByLabelText('Nome:')).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByLabelText('Nome:')).toBeInTheDocument();
        expect(screen.getByLabelText('Telefone:')).toBeInTheDocument();
    })
})