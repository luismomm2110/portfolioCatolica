import {render, screen} from '@testing-library/react';
import {PaginaInicial} from '../PaginaInicial'

describe('Pagina Inicial', () => {
    it('Should render the initial page with Login screen', () => {
        render(<PaginaInicial />);

        expect(screen.getByRole('heading', {name: 'Login'})).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'login'})).toBeInTheDocument();
    })
})