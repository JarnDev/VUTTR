import React, { Component } from "react";
import './modal.css'


export default class Modal extends Component {
    render() {
        if (!this.props.show) {
            return null;
        }
        var modalButton = null
        if (this.props.modalButton) {
            modalButton =
                (<div className="actions">
                    <button className="primary-button" onClick={this.props.onConfirm}>
                        {this.props.confirmText}
                    </button>
                </div>)

        }


        return (
            <div className="backDrop">
                <div className="modal" id="modal">
                    <span onClick={this.props.onClose}>x</span>
                    <h2>{this.props.title}</h2>
                    <div className="content">{this.props.children}</div>
                    {modalButton}
                </div>
            </div>
        )
    }
}