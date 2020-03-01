import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class NoteSidebar extends Component {
 


  render() {
    if(!this.props.state) {
      return <div>Loading...</div>
    }

    const currentNoteId = this.props.match.params.noteid;
    const currentNote = this.props.state.notes.find(note => note.id == currentNoteId);
    const currentFolder = (currentNote) ? currentNote.folder_id : 1;
    const displayFolder = this.props.state.folders.find(folder => folder.id == currentFolder);
    const displayFolderName = displayFolder ? displayFolder.folder_name : ''
    
    return (
      <div className='main-sidebar-div'>
        <div className='app-sidebar'>
        <ul>
          <li>{displayFolderName}</li>
        </ul>
        <Link to={`/folder/${currentFolder}`}><button>Go Back</button></Link>
        </div>
      </div>
    )
  }
}