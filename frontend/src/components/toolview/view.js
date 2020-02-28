import React, { Component } from "react";
import backend from "../../services/backend_api";
import ViewCard from "./viewcard/viewcard";
import { Redirect } from "react-router-dom"
import './view.css'
import Modal from "../modal/modal";
import AddToolForm from "../addToolForm/addToolForm"
import { decoder } from '../../utils/jwtDecoder'
import _ from 'underscore'
import Nav from "../nav/nav";
export default class ToolView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tools: [],
      search: '',
      searchByTag: false,
      removeWarnModal: false,
      addToolModal: false,
      modalTool: null
    };
    this.handleChange = this.handleChange.bind(this)
    this.getTools = this.getTools.bind(this)
    this.removeWarnModalToggle = this.removeWarnModalToggle.bind(this)
    this.addToolModalToggle = this.addToolModalToggle.bind(this)
    this.setModalTool = this.setModalTool.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.handleAddSubmit = this.handleAddSubmit.bind(this)
    this.logOut = this.logOut.bind(this)
    this.handleChangeDebounced = this.handleChangeDebounced.bind(this)
    this.debouncedSearchTerm = _.debounce(this.handleChange, 500)
  }

  async componentDidMount() {
    const backend_response = await backend('/tools', { headers: { Authorization: sessionStorage.getItem('token') } })
    const user = await decoder()
    this.setState({
      tools: backend_response.data,
      user: user
    })
  };

  async getTools() {
    if (this.state.searchByTag) {
      var backend_response = await backend('/tools', {
        headers: { Authorization: sessionStorage.getItem('token') },
        params: { tag: this.state.search }

      })
    } else {
      backend_response = await backend('/tools', {
        headers: { Authorization: sessionStorage.getItem('token') },
        params: { global: this.state.search }
      })
    }
    this.setState({ tools: backend_response.data })
  }

  async handleChange(event) {
    if (event.target.name === 'searchByTag') {
      this.setState({
        [event.target.name]: !this.state.searchByTag
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    await this.getTools()

  }

  handleChangeDebounced(event) {
    event.persist()
    this.debouncedSearchTerm(event)
  }


  addToolModalToggle() {
    this.setState({ addToolModal: !this.state.addToolModal })
  }

  async handleAddSubmit(payload) {
    const backend_response = await backend.post('/tools', payload, {
      headers: { Authorization: sessionStorage.getItem('token') }
    })

    if (backend_response.status === 201) {
      this.setState({
        tools: [...this.state.tools, backend_response.data],
      })
    }
    this.addToolModalToggle()
  }

  removeWarnModalToggle() {
    this.setState({ removeWarnModal: !this.state.removeWarnModal })
  }

  setModalTool(tool) {
    this.setState({ modalTool: tool })
  }

  async removeItem() {
    await backend.delete(`/tools/${this.state.modalTool._id}`,
      { headers: { Authorization: sessionStorage.getItem('token') } })

    this.setState({
      tools: this.state.tools.filter(tool => (tool._id !== this.state.modalTool._id))
    })
    this.removeWarnModalToggle()
  }

  logOut() {
    sessionStorage.clear()
    this.setState({
      user: ''
    })
  }

  render() {
    if (!sessionStorage.getItem('token')) {
      return <Redirect to='/' />
    }
    var modal = null;
    if (this.state.removeWarnModal) {
      modal = <Modal title={`${'\u2718'} Remove Tool`} modalButton={true} confirmText='Yes, remove' onConfirm={this.removeItem} onClose={this.removeWarnModalToggle} show={this.state.removeWarnModal}>Are you sure you want to remove {this.state.modalTool.title}?</Modal>
    } else if (this.state.addToolModal) {
      modal = <Modal title=' + Add new tool' onClose={this.addToolModalToggle} show={this.state.addToolModal}><AddToolForm onSubmit={this.handleAddSubmit} /></Modal>
    }
    var userBar = null
    if (this.state.user) {
      userBar = <Nav logOut={this.logOut} user={this.state.user} />
    }

    return (
      <>
        {modal}
        < div className='container' >
          {userBar}
          <div className='searchForm'>
            <form>
              <input id='searchInput' type="text" placeholder='search' name='search' onChange={this.handleChangeDebounced} />
              <label className="switch">
                <input name="searchByTag" onChange={this.handleChangeDebounced} type="checkbox" />
                <span className="slider round"></span>
              </label>
              <label id="tagLabel" htmlFor='searchByTag'>tags only</label>
            </form>
          </div>
          <button className='addButton' onClick={this.addToolModalToggle}>+ Add</button>
          <ul>
            {this.state.tools.map(tool => (
              <ViewCard setModalTool={this.setModalTool} removeHandle={this.removeWarnModalToggle} key={tool._id} tool={tool} />
            ))}
          </ul>
        </div >
      </>
    )
  }
}