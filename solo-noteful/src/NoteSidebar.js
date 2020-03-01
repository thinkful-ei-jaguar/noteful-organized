import React, { Component } from 'react'
import { Link  } from 'react-router-dom'
import NotefulContext from './NotefulContext'
import PropTypes from 'prop-types'
export default class NoteSidebar extends Component {
  static contextType = NotefulContext;
  
  render() {
    
    // const currentNoteId = this.props.match.params.noteid;
    // const currentNote = this.props.state.notes.find(note => note.id == currentNoteId);
    // const currentFolder = (currentNote) ? currentNote.folder_id : 1;
    // const displayFolder = this.props.state.folders.find(folder => folder.id == currentFolder);
    // const displayFolderName = displayFolder ? displayFolder.folder_name : ''
    
    let currentNoteId = this.props.match.params.noteid;
    
    let currentNote = this.context.notes.find(note => note.id === currentNoteId);
    let currentNoteFolder = (currentNote) ? currentNote.folder_id : 1;
    let displayFolder = this.context.folders.find(folder => folder.id === currentNoteFolder);
    let displayFolderName = displayFolder ? displayFolder.folder_name : '';
    
  
    return (
      <div className='main-sidebar-div'>
        <div className='app-sidebar'>
        <ul>
          <li>{displayFolderName}</li>
        </ul>
        <button><Link to={`/folder/${currentNoteFolder}`}>Go Back</Link></button>
        </div>
      </div>
    )
  }
}

NoteSidebar.propTypes = { 
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteid: PropTypes.string.isRequired
    })

})}