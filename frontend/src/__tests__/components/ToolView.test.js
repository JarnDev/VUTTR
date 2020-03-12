import React from 'react';
import { render } from '@testing-library/react';
import ToolView from '../../components/toolview/view';


describe('<ToolView>', () => {

    beforeAll(() => {
        sessionStorage.setItem("token", "token")
    })


    it('ToolView should render the ToolView page', () => {
        const { getByText, getByPlaceholderText } = render(<ToolView />);

        const search = getByPlaceholderText('search')
        const addButton = getByText("+ Add")

        expect(search).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();

    })
})
