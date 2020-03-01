import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import backend from "../../services/backend_api";
import './cadastro.css'
export default class Cadastro extends Component {

    constructor(props){
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            login: '',
            password: '',
            avatar: '',
            cancel:false,
            blockLink:false,
            loginExist:false
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.cancelHandler = this.cancelHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.setLoginExist = this.setLoginExist.bind(this)
        this.removeImg = this.removeImg.bind(this)
    }

    changeHandler(event) {
        if(event.target.name === "avatar" && event.target.type === "file"){
            if(event.target.files[0]){
                this.setState({
                    [event.target.name]: event.target.files[0],
                    blockLink:true
                })
            }else{
                this.setState({
                    [event.target.name]: '',
                    blockLink:false
                })
            }
        }else{
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    cancelHandler(){
        this.setState({
            cancel:true
        })
    }

    setLoginExist(){
        this.setState({
            loginExist:true
        })
    }

    removeImg(){
        this.setState({avatar:'',blockLink:false})
    }

    async submitHandler(event){
        event.preventDefault()
        if(typeof(this.state.avatar) === 'object'){
            var reader = new FileReader();
            reader.readAsDataURL(this.state.avatar);
            reader.onload = async () => {
                const payload = {
                    firstName:this.state.firstName,
                    lastName:this.state.lastName,
                    login:this.state.login,
                    password:this.state.password,
                    avatar:reader.result
                }
                backend.post("/user/cadastrar", payload, {
                    headers: { Authorization: sessionStorage.getItem('token') }
                }).then(val => {
                    // console.log(val)
                    this.cancelHandler()
                }).catch(err => {
                    if(err.response.status === 403){
                        this.setLoginExist()
                    }
                })
            }
        }else{
            const payload = {
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                login:this.state.login,
                password:this.state.password,
                avatar:this.state.avatar
            }
            await backend.post("/user/cadastrar", payload, {
                headers: { Authorization: sessionStorage.getItem('token') }
            }).then(val => {
                // console.log(val)
                this.cancelHandler()
            }).catch(err => {
                if(err.response.status === 403){
                    this.setLoginExist()
                }
            })
        }
        
    }

    render() {
        if(this.state.cancel){
            return <Redirect to='/' />
        }
        var avatarLink = null
        var loginErr = null
        if(!this.state.blockLink){
            avatarLink = (
                <div className="inputField">
                        <label htmlFor="avatarLink">Avatar Link</label>
                        <input type="text" name="avatar" id="avatarLink" value={this.state.avatar} onChange={this.changeHandler} />
                </div>
            )
        }else{
            avatarLink = (
                <span id="removeImg" onClick={this.removeImg}>{'\u2718'} Remove Image</span>
            )
        }
        if(this.state.loginExist){
            loginErr = (
                <label id="loginErr">(login existe)</label>
            )
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
                        <input type="text" name="lastName" id="lastName" onChange={this.changeHandler}  required/>
                    </div>

                    <div className="inputField">
                        <label htmlFor="login">Login {loginErr}</label>
                        <input type="text" name="login" id="login" onChange={this.changeHandler}  required/>
                    </div>

                    <div className="inputField">
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" id="password" onChange={this.changeHandler}  required/>
                    </div>

                    <div className="inputField">
                        <label htmlFor="avatar">Avatar</label>
                        <input type="file" name="avatar" id="avatar" onChange={this.changeHandler} />
                    </div>

                    {avatarLink}

                    <div className="buttonDiv">
                        <button type="button"id="cancelButton" onClick={this.cancelHandler}>Cancel</button>
                        <button id="submitButton">Cadastrar</button>
                    </div>

                </form>

            </div>
        )
    }
}
