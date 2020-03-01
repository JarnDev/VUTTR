import React, { Component } from "react";
import './nav.css'

export default class Nav extends Component {
    render() {
        const page = window.location.pathname.replace('/', '').toUpperCase()
        return (
            <div className="navBar">
                <div className="logoImgDiv">
                    <img className="logoImg" alt="" src={require('../../assets/img/Icon-Logo-Bossa.png')} />
                </div>
                <div className="pageName">
                    <span>{page}</span>
                </div>
                <div className="userBar">
                    <span>{this.props.user.firstName}</span>
                    <img className="userImg" alt="" src={this.props.user.avatar || require('../../assets/img/Icon-User-2px.png')} />
                    <img onClick={this.props.excludeUser} className="excludeImg" alt="" src={require('../../assets/img/Icon-Cancel-2px.png')} />
                    <img onClick={this.props.logOut} className="statusImg" alt="" src={require('../../assets/img/Icon-Unlocked-2px.png')} />
                </div>
            </div>
        )
    }
}   