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
      loginError: null,
      cadastrar: false
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cadatroRedirect = this.cadatroRedirect.bind(this);
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
        this.setState({
          "loginError": (
            <div className="errorDiv">
              <span className="errorLogin">Wrong User or Password!</span>
            </div>
          )
        })
      });
    event.preventDefault();
  }

  cadatroRedirect(event) {
    this.setState({
      cadastrar: true
    })
  }


  render() {
    if (this.state.logedIn || sessionStorage.getItem('token')) {
      return <Redirect to='/toolview' />
    }
    if (this.state.cadastrar) {
      return <Redirect to='/cadastro' />
    }

    return (
      <div className='loginContainer'>
        <h1>VUTTR</h1>
        <h3>Very Useful Tools to Remember</h3>
        <form onSubmit={this.handleSubmit} className='loginForm'>
          <input
            id="loginUser"
            type="text"
            name="login"
            placeholder="login"
            value={this.state.login}
            onChange={this.handleChange}
            required
          />

          <input
            id="loginPassword"
            type="password"
            name="password"
            placeholder="senha"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button id="submitButton" type="submit">Logar</button>
          <button type="button" id="cadastrarButton" onClick={this.cadatroRedirect}>Cadastrar</button>
          {this.state.loginError}
        </form>
      </div>
    );
  }
}
