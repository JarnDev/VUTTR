import React, { Component } from "react";
import backend from "../../services/backend_api";
import {Redirect} from "react-router-dom"
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
    if (('indexedDB' in window)) {
        console.log('This browser does support IndexedDB');
      }
    backend
      .post(
        "/user/logar",
        {
            login: login,
            password: password
        }
      )
      .then(response => {
        console.log(`API: ${JSON.stringify(response.data)}`)
        sessionStorage.setItem('token', response.data.token)
        this.setState({"logedIn":true})
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    if(this.state.logedIn){
      return <Redirect to='/toolview'/>
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="login"
            placeholder="login"
            value={this.state.login}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Logar</button>
        </form>
      </div>
    );
  }
}