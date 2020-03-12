import React from 'react';
import { render } from '@testing-library/react';
import Login from '../../components/auth/login';


describe('<Login>', () => {
    it('Login should render the login page', () => {
        const { getByText, getByPlaceholderText } = render(<Login />);

        const login = getByPlaceholderText('login')
        const senha = getByPlaceholderText('senha')
        const loginButton = getByText("Logar")
        const cadastroButton = getByText("Cadastrar")

        expect(login).toBeInTheDocument();
        expect(senha).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
        expect(cadastroButton).toBeInTheDocument();
    })
})