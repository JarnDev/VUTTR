import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import backend from "../../services/backend_api";
import fileToBase64 from "../../utils/asyncReadFile"
import './cadastro.css'
export default class Cadastro extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            login: '',
            password: '',
            avatar: '',
            cancel: false,
            blockLink: false,
            loginExist: false
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.cancelHandler = this.cancelHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.setLoginExist = this.setLoginExist.bind(this)
        this.removeImg = this.removeImg.bind(this)
    }

    changeHandler(event) {
        if (event.target.name === "avatar" && event.target.type === "file") {
            if (event.target.files[0]) {
                this.setState({
                    [event.target.name]: event.target.files[0],
                    blockLink: true
                })
            } else {
                this.setState({
                    [event.target.name]: '',
                    blockLink: false
                })
            }
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    cancelHandler() {
        this.setState({
            cancel: true
        })
    }

    setLoginExist() {
        this.setState({
            loginExist: true
        })
    }

    removeImg() {
        this.setState({ avatar: '', blockLink: false })
    }

    async submitHandler(event) {
        event.preventDefault()
        const payload = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            login: this.state.login,
            password: this.state.password,
            avatar: this.state.avatar
        }

        if (typeof (this.state.avatar) === 'object') {
            payload['avatar'] = await fileToBase64(this.state.avatar)
        }

        backend.post("/user/cadastrar", payload, {
            headers: { Authorization: sessionStorage.getItem('token') }
        }).then(resp => {
            this.cancelHandler()
        }).catch(err => {
            if (err.response.status === 403) {
                this.setLoginExist()
            }
        })

    }

    render() {
        if (this.state.cancel) {
            return <Redirect to='/' />
        }

        return (
            <div className='cadastroContainer'>
                <h3>CADASTRO</h3>
                <form className='cadastroForm' onSubmit={this.submitHandler}>

                    <div className="inputField">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" onChange={this.changeHandler} required />
                    </div>

                    <div className="inputField">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" onChange={this.changeHandler} required />
                    </div>

                    <div className="inputField">
                        <label htmlFor="login">
                            Login {this.state.loginExist && <label id="loginErr">Login já existe</label>}
                        </label>
                        <input type="text" name="login" id="login" onChange={this.changeHandler} required />
                    </div>

                    <div className="inputField">
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" id="password" onChange={this.changeHandler} required />
                    </div>

                    <div className="inputField">
                        <label htmlFor="avatar">Avatar</label>
                        <input type="file" name="avatar" id="avatar" onChange={this.changeHandler} accept="image/x-png,image/gif,image/jpeg" />
                    </div>

                    {this.state.blockLink ?

                        <span id="removeImg" onClick={this.removeImg}>{'\u2718'} Remove Image</span>

                        :

                        <div className="inputField">
                            <label htmlFor="avatarLink">Avatar Link</label>
                            <input type="text" name="avatar" id="avatarLink" value={this.state.avatar} onChange={this.changeHandler} />
                        </div>


                    }

                    <div className="buttonDiv">
                        <button type="button" id="cancelButton" onClick={this.cancelHandler}>Cancel</button>
                        <button id="submitButton">Cadastrar</button>
                    </div>

                </form>

            </div>
        )
    }
}
