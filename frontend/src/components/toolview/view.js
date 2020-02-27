import React, { Component } from "react";
import backend from "../../services/backend_api";
import ViewCard from "./viewcard/viewcard";
import {Redirect} from "react-router-dom"
import './view.css'
export default class ToolView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tools :[],
        search: '',
        searchByTag:false
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount(){
      
    const backend_response = await backend('/tools', {headers: {Authorization: sessionStorage.getItem('token')}})
    this.setState({tools: backend_response.data})
     
  };

  async handleSubmit(event){
    event.preventDefault()
    if(this.state.searchByTag){
        var backend_response = await backend('/tools', {
            headers: {Authorization: sessionStorage.getItem('token')},
            params:{tag:this.state.search}
        
        })
    } else{
        var backend_response = await backend('/tools', {
            headers: {Authorization: sessionStorage.getItem('token')},
            params:{global:this.state.search} 
        })
    }
    this.setState({tools: backend_response.data})
  }

  handleChange(event) {
    if(event.target.name === 'searchByTag'){
        this.setState({
          [event.target.name]: !this.state.searchByTag
        });
    }else{
        this.setState({
          [event.target.name]: event.target.value
        });
    }
  }

  render() {
    if(!sessionStorage.getItem('token')){
        return <Redirect to='/'/>
    }
    return (
        <div className='container'>
            <div className='searchForm'>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder='search' name='search' onChange={this.handleChange}/>
                    <input
                        name="searchByTag"
                        id="searchByTag"
                        type="checkbox"
                        onChange={this.handleChange} />
                    <label htmlFor='searchByTag'>
                        search in tags only
                    </label>
                </form>
            </div>
            <ul>
                {this.state.tools.map(tool =>( 
                    <ViewCard key={tool._id} tool={tool}/>
                ))}  
            </ul>
        </div>

    )
  }
}