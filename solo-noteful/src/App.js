import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MainMain from './MainMain';
import MainSidebar from './MainSidebar';
import FolderMain from './FolderMain';
import FolderSidebar from './FolderSidebar';
import NoteMain from './NoteMain';
import NoteSidebar from './NoteSidebar';
import './App.css';
import config from './config.js';

class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      folders: [],
      notes: [],
      fetchFolders: this.fetchFolders,
      fetchNotes: this.fetchNotes
    }

    this.fetchFolders = () => {
      fetch(`${config.API_ENDPOINT}/api/folders`)
        .then(response => response.json())
        .then(response => this.setState({ folders: response }))

    }

    this.fetchNotes = () => {
      fetch(`${config.API_ENDPOINT}/api/notes`)
        .then(response => response.json())
        .then(response => this.setState({ notes: response }))  
    }

    this.addNote = (newNote) => {
      fetch(`${config.API_ENDPOINT}/api/notes`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      })
        .then(response => this.fetchNotes())
    }

    this.addFolder = (newFolder) => {
      fetch(`${config.API_ENDPOINT}/api/folders`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFolder)
      })
        .then(response => this.fetchFolders())
    }

    this.deleteNote = (deleteNote) => {
      fetch(`${config.API_ENDPOINT}/api/notes/${deleteNote}`, {
        method: 'DELETE'
      })
        .then(response => this.fetchNotes())
    }
    }


} 

  componentDidMount() {
    this.fetchFolders()
    this.fetchNotes()
  }

  render () {
    return (
      <>
      <h1><Link to='/' className='noteful-header' >Noteful</Link></h1>
      <div className='main-view'>
        

        <div className='app-sidebar'>
          <Route exact path='/' render={(props) => 
            <MainSidebar {...props} values={this.state.folders} />
          } 
          /> 
          <Route path='/folder/:folderid' render={props => 
            
            <FolderSidebar {...props} state={this.state}  />
          } 
          /> 
          <Route path='/note/:noteid' render={(props) => {
            return <NoteSidebar {...props} state={this.state} />
          }} 
          /> 

        </div>

        <main className='app-main'>
          <Route exact path='/' render={() => {
            return <MainMain values={this.state.notes} />
          }} 
          /> 
          <Route path='/folder/:folderid' render={(props) => {
            return <FolderMain {...props} state={this.state} />
          }} 
          /> 
          <Route path='/note/:noteid' render={(props) => {
            return <NoteMain {...props} state={this.state} />
          }} 
          />
        </main>

      </div>
      </>
    );
  }
}


export default App;


