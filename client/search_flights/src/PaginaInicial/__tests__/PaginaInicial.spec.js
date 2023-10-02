import {render, screen} from '@testing-library/react';
import {PaginaInicial} from '../PaginaInicial'
import userEvent from '@testing-library/user-event'

describe('Pagina Inicial', () => {
    it('Should render the initial page with Login screen', () => {
        render(<PaginaInicial/>);

        expect(screen.getByRole('heading', {name: 'Login'})).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument();
    })

    it('Should change to Register screen when the Register button is clicked', async () => {
        render(<PaginaInicial/>);

        userEvent.click(screen.getByRole('button', {name: 'Crie sua conta'}));

        expect(await screen.findByText('Crie sua conta!')).toBeInTheDocument()
    })

    it('Should change to Login screen when is the SignUp and then click on Login', async () => {
        render(<PaginaInicial/>);
        userEvent.click(await screen.findByRole('button', {name: 'Crie sua conta'}));

        userEvent.click(await screen.findByRole('button', {name: 'Login'}));

        expect(await screen.findByRole('heading', {name: 'Login'})).toBeInTheDocument();
    })
})