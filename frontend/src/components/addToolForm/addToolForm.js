import React, { Component } from "react";
import './addToolForm.css'
import { stringTagsToArray } from '../../utils/stringTagsToArray'

export default class AddToolForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: '',
            description: '',
            tags: ''

        }

        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }


    submitHandler(event) {
        event.preventDefault();
        const payload = {
            title: this.state.title,
            link: this.state.link,
            description: this.state.description,
            tags: stringTagsToArray(this.state.tags)
        }
        this.props.onSubmit(payload)
    }

    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form className="toolForm" onSubmit={this.submitHandler}>
                <div className="inputField">
                    <label htmlFor="title">Tool Name</label>
                    <input type="text" name="title" id="title" onChange={this.changeHandler} required />
                </div>

                <div className="inputField">
                    <label htmlFor="link">Tool Link</label>
                    <input type="text" name="link" id="link" onChange={this.changeHandler} required />

                </div>
                <div className="inputField">
                    <label htmlFor="description">Tool Description</label>
                    <textarea name="description" id="description" onChange={this.changeHandler} required />

                </div>
                <div className="inputField">
                    <label htmlFor="tags">Tags</label>
                    <input type="text" name="tags" id="tags" onChange={this.changeHandler} required />

                </div>

                <button id="submitButton" type="submit">Add Tool</button>
            </form>
        )
    }

}