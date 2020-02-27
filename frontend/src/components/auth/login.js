import React, { Component } from "react";
import backend from "../../services/backend_api";
import { Redirect } from "react-router-dom"
import './login.css'
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      logedIn: false,

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { login, password } = this.state;

    backend
      .post(
        "/user/logar",
        {
          login: login,
          password: password
        }
      )
      .then(response => {
        sessionStorage.setItem('token', response.data.token)
        this.setState({ "logedIn": true })
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    if (this.state.logedIn) {
      return <Redirect to='/toolview' />
    }
    return (
      <div className='loginContainer'>
        <form onSubmit={this.handleSubmit} className='loginForm'>
          <input
            id="login"
            type="text"
            name="login"
            placeholder="login"
            value={this.state.login}
            onChange={this.handleChange}
            required
          />

          <input
            id="password"
            type="password"
            name="password"
            placeholder="senha"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button id="submitButton" type="submit">Logar</button>
        </form>
      </div>
    );
  }
}