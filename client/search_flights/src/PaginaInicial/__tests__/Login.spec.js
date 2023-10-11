import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'


import Login from '../Login'


describe('Login', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => {
                return Promise.resolve({
                    json: () => Promise.resolve({}),
                })
            }
        );
    })
    
    it('should render the login form', () => {
        render(<Login />);

        expect(screen.getByRole('heading', {name: 'Login'})).toBeInTheDocument();
        expect(screen.getByLabelText('Email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    })

    it ('should render the login button', () => {
        render(<Login />);

        expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument();
    })

    it('should update email and password fields when user type', () => {
        render(<Login />);

        userEvent.type(screen.getByLabelText('Email:'), 'teste@teste.com')
        userEvent.type(screen.getByLabelText('Password:'), 'senha_teste')

        expect(screen.getByLabelText('Email:')).toHaveValue('teste@teste.com');
        expect(screen.getByLabelText('Password:')).toHaveValue('senha_teste');
    })

    it ('should call the login gateway when the login button is clicked',  () => {
      global.fetch = jest.fn(() => {
              return Promise.resolve({
                  json: () => Promise.resolve({}),
              })
          }
      );
        render(<Login />);
        userEvent.type(screen.getByLabelText('Email:'), 'cliente@cliente.com');
        userEvent.type(screen.getByLabelText('Password:'), 'senha_correta');

        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(global.fetch).toHaveBeenCalledTimes(1);
    })

    it('should render the error message when the login fails', async () => {
     global.fetch = jest.fn(() => {
        return Promise.reject(new Error('Email e/ou senha incorreto(s)'));
     });
        render(<Login />);
        userEvent.type(screen.getByLabelText('Email:'), 'cliente@cliente.com');
        userEvent.type(screen.getByLabelText('Password:'), 'senha_errada');
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        expect(await screen.findByText('Email e/ou senha incorreto(s)')).toBeInTheDocument();
    })

    it('should show "sign up" link', () => {
        render(<Login />);
        expect(screen.getByRole('button', {name: 'Crie sua conta'})).toBeInTheDocument();
    })
})