import React, { Component } from "react";
import './modal.css'


export default class Modal extends Component {
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="backDrop">
                <div className="modal" id="modal">
                    <h2>{this.props.title}</h2>
                    <div className="content">{this.props.children}</div>
                    <div className="actions">
                        <button className="toggle-button" onClick={this.props.onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}