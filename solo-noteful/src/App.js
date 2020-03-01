import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MainMain from './MainMain';
import MainSidebar from './MainSidebar';
import FolderMain from './FolderMain';
import FolderSidebar from './FolderSidebar';
import NoteMain from './NoteMain';
import NoteSidebar from './NoteSidebar';
import './App.css';
import NotefulContext from './NotefulContext';
import AddFolder from './AddFolder';
import AddFolderSidebar from './AddFolderSidebar';
import AddNote from './AddNote';
import ErrorBoundary from './ErrorBoundary';
import config from './config'




class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      "folders": [],
      "notes": []
    };
  }
  
  deleteNote = (noteId) => {
    const updatedNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: updatedNotes
    })
  }

  addFolder = () => {
    fetch('${config.API_ENDPOINT}/folders')
      .then(response => response.json())
      .then(newFolders => {
        return this.setState({
          folders: newFolders
        })
      });
  }

  addNote = () => {
    fetch('${config.API_ENDPOINT}/notes')
      .then(response => response.json())
      .then(newNotes => {
        return this.setState({
          notes: newNotes
        })
      });
  }
  
  componentDidMount() {
    fetch('${config.API_ENDPOINT}/folders')
      .then(response => response.json())
      .then(newFolders => {
        return this.setState({
          folders: newFolders
        })
      });
    fetch('${config.API_ENDPOINT}/notes')
      .then(response => response.json())
      .then(newNotes => {
        return this.setState({
          notes: newNotes
        })
      });  
  }
  


  render () {
    
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder, 
      addNote: this.addNote
    }
    return (
      <>
      <h1><Link to='/' className='noteful-header'>Noteful</Link></h1>
      <div className='main-view'>
        <ErrorBoundary>
        <NotefulContext.Provider value={contextValue}>
          <div className='app-sidebar'>
            <Route exact path='/' component={MainSidebar} 
            /> 
            <Route path='/folder/:folderid' component={FolderSidebar} 
            /> 
            <Route path='/note/:noteid' component={NoteSidebar} 
            />
            <Route exact path ='/create-folder' component={AddFolderSidebar}
            />
            <Route exact path ='/create-note' component={MainSidebar}
            />
          </div>
        
          <main className='app-main'>
            <Route exact path='/' component={MainMain}
            /> 
            <Route path='/folder/:folderid' component={FolderMain} 
            /> 
            <Route path='/note/:noteid' component={NoteMain}
            />
            <Route exact path ='/create-folder' component={AddFolder}
            />
            <Route exact path ='/create-note' component={AddNote}
            />
          </main>
          
        </NotefulContext.Provider>
        </ErrorBoundary>
      </div>
      </>
    );
  }
}


export default App;


