import {render, screen} from '@testing-library/react';
import Profile from '../Profile'
import userEvent from '@testing-library/user-event'

describe('Profile', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => {
                return Promise.resolve({
                    json: () => Promise.resolve({}),
                })
            }
        );
    })

    it('Should render the Profile screen', () => {
        render(<Profile/>);

        expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('Should call the logout gateway when I click in the Logout', () => {
        render(<Profile/>)

        userEvent.click(screen.getByRole('button', {name: 'Logout'}));

        expect(global.fetch).toHaveBeenCalledTimes(1);
    })
})
