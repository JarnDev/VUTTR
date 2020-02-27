import React, { Component } from "react";
import { arrayTagsToString } from '../../../utils/arrayTagsToString'
import './viewcard.css'
export default class ViewCard extends Component {
  constructor(props) {
    super(props);
    this.removeHandle = this.removeHandle.bind(this)
  }

  removeHandle() {
    this.props.setModalTool(this.props.tool)
    this.props.removeHandle()
  }


  render() {
    return (

      <li key={this.props.tool._id} className='toolCard'>
        <span className="remove" onClick={this.removeHandle}>{'\u2718'} remove</span>
        <a href={this.props.tool.link} target="blank">{this.props.tool.title}</a>
        <p>{this.props.tool.description}</p>
        <strong>{arrayTagsToString(this.props.tool.tags)}</strong>
      </li>

    )
  }
}   