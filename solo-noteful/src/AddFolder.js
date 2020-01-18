import React, { Component } from 'react'
import notefulContext from './NotefulContext';
import ErrorMessage from './ErrorMessage';
import ValidationError from './ValidationError';;


export default class AddFolder extends Component {
  
  static contextType = notefulContext;

  constructor(props) {
    super(props);
    this.state = {
      error: {value: ''}, 
      success: {value: false}, 
      id:{value: ''},
      name: {
        value: '',
        touched: false
      },
    }
  }

  validateFolder() {
    console.log(this.state.name.value);
    const nameCheck = this.state.name.value;
    if (nameCheck.length === 0) {
      return 'Name is required';
    }
  }

  addNewFolder(folder) {
    fetch(`http://localhost:9090/folders/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: folder
      
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        this.context.addFolder()
        this.setState({
          success: {value: true}
        })
        this.props.history.push('/');
        return res.json()
      })
      .catch(err => {
        this.setState({
          error: {value: err.message},
          success: {value: false}
        })
      })
  }

  handleNewFolder (event) {
    event.preventDefault();
    const newFolderName = this.state.name.value;
    const newFolderId = newFolderName;
    const newFolder = JSON.stringify({
      id: newFolderId,
      name: newFolderName
    })
    this.addNewFolder(newFolder);
    
  }

  updateNameId(folderName) {
    this.setState({
      id: {value: folderName},
      name: {value: folderName, touched: true}
    })
    console.log(this.state.name);
  }
  
  render() {
    return (
      <form onSubmit={(event) => this.handleNewFolder(event)}>
        <label htmlFor="folder-name"><p>New Folder Name: </p></label>
        <input type="text" name="name" id="name" onChange={e => this.updateNameId(e.target.value)}/>
        <button disabled={this.validateFolder()}>Create Folder</button>
        {this.state.error.value !== '' && <ErrorMessage props={this.state.error.value} />}
        
        {this.state.name.touched && (<ValidationError message={this.validateFolder()} />)}
      </form>
    )
  }
}
