import React from 'react';
import { render } from '@testing-library/react';
import App from '../../App';


describe('<App>', () => {
  it('APP should render the login page', () => {
    const { getByText, getByPlaceholderText } = render(<App />);

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
