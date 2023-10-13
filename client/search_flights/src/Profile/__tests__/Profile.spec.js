import {render, screen} from '@testing-library/react';
import Profile from '../Profile'

describe('Profile', () => {
    it('Should render the Profile screen', () => {
        render(<Profile/>);

        expect(screen.getByText('Profile')).toBeInTheDocument();
    });
});