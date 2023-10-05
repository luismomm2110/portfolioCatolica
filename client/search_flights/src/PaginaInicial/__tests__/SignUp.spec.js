import {render, screen} from '@testing-library/react';


import {SignUp} from '../SignUp'
import userEvent from '@testing-library/user-event'


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

    it('should render error when password and confirmPassword doesnt match', () => {
        render((<SignUp />));

        userEvent.type(screen.getByLabelText('Nome:'), 'teste');
        userEvent.type(screen.getByLabelText('Email:'), 'teste@teste.com')
        userEvent.type(screen.getByLabelText('Password:'), 'senha_teste')
        userEvent.type(screen.getByLabelText('Confirme sua senha:'), 'senha_errada')

        expect(screen.getByText('Senhas não coincidem')).toBeInTheDocument();
    })
})