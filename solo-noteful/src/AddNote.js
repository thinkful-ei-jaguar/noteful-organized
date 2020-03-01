import React, { Component } from 'react'
import notefulContext from './NotefulContext'
import ValidationError from './ValidationError';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';
import config from './config'



export default class AddNote extends Component {
  
  static contextType = notefulContext;

  constructor(props) {
    super(props);
    this.state = {
      id:{
        value: ''
      },

      name: {
        value: '',
        touched: false
      },

      modified: {
        value: new Date()
      },

      folderId: {
        value: ''
      },

      content: {
        value: ''
      },

      error: {
        value: ''
      },

      success: {
        value: false
      }

    }
  }

  addNewNote(note) {
    this.setState({
      error: {value: ''}
    })
    fetch(`${config.API_ENDPOINT}/notes/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: note
      
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        this.context.addNote();
        this.setState({
          success: {value: true}
        })
        this.props.history.push('/');
        return res.json();
      })
      .catch(err => {
        this.setState({
          error: {value: err.message},
          success: {value: false}
        })
      })
  }

  handleNewNote (event) {
    event.preventDefault();
    const newNote = JSON.stringify({
      id: this.state.id.value,
      name: this.state.name.value,
      modified: this.state.modified.value ,
      folderId: this.state.folderId.value,
      content: this.state.content.value
    })
    this.addNewNote(newNote);
  }

  validateName(name) {
    const nameCheck = this.state.name.value.trim();
    if (nameCheck.length === 0) {
      return 'Name is required';
    }
  }

  updateNameId(name) {
    this.setState({
      id: {value: name},
      name: {value: name, touched: true}
    })
  }

  updateFolderId(folderName) {
    const folderId = this.context.folders.find(folder => folder.name === folderName).id;
    this.setState({
      folderId: {value: folderId}
    })
  }

  updateContent(content) {
    this.setState({
      content: {value: content}
    })
  }
  

  render() {
    const folderDropdown = this.context.folders.map((folder, index) => {
      return <option key={index} value={folder.name}>{folder.name}</option>
    });

    return (
      <form id="note-form" onSubmit={(event) => this.handleNewNote(event)}>
        <label htmlFor="noteName"><p>New Note Name: </p></label>
        <input onChange={e => this.updateNameId(e.target.value)} type="text" name="noteName" id="noteName" />

        <label htmlFor="noteContent"><p>New Note Content: </p></label>
        <textarea onChange={e => this.updateContent(e.target.value)} form="note-form" name="noteContent" id="noteContent" rows="4" cols="36" />

        <label htmlFor="noteFolder"><p>File note under: </p></label>
        <select onChange={e => this.updateFolderId(e.target.value)} name="noteFolder" id="noteFolder" form="note-form">
          {folderDropdown}
        </select>
        
        <button disabled={this.validateName()}>Create Note</button>
        {this.state.name.touched && (<ValidationError message={this.validateName()} />)}
        {this.state.error.value !== '' && <ErrorMessage props={this.state.error.value} />}
        {(this.state.error.value === '' && this.state.success.value === true) && <p>Successfully submitted new "{this.state.name.value}" note!</p>}
        <Link to="/"><button>Home Page</button></Link>
      </form>
    )
  }
}
