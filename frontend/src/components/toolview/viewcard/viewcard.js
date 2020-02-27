import React, { Component } from "react";
import {arrayTagsToString} from '../../../utils/arrayTagsToString'
import './viewcard.css'
export default class ViewCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
  
        <li key={this.props.tool._id} className='toolCard' >
            <span className="remove">{'\u2718'} remove</span>    
            <a href={this.props.tool.link} target="blank">{this.props.tool.title}</a>
            <p>{this.props.tool.description}</p>
            <strong>{arrayTagsToString(this.props.tool.tags)}</strong>
        </li> 

    )
  }
}   