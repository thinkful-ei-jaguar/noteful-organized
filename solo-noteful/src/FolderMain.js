import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from './NotefulContext'
import PropTypes from 'prop-types'
import config from './config'

function deleteBookmarkRequest(noteId, callback) {
  fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
}

export default class FolderMain extends Component {
  static contextType = NotefulContext;
  

  render() {
    
    const { notes } = this.context;
    const { folderid } = this.props.match.params;
    
    const theseNotes = notes.filter(note => note.folderId === folderid)
    return (
      
      <div className="main-main-div">

          <ul className='main-view-main'>
            {theseNotes.map((note, i) => {
              return (
                <li className='main-note-list' key={i}>
                  <Link to={`../../note/${note.id}`}>{note.name}</Link>
                  <p>Last modified: {note.modified.slice(0, 10)}</p>
                  <button className='main-note-delete' onClick={() => {
                    deleteBookmarkRequest(
                        note.id,
                        this.context.deleteNote
                        )
                      }}
                    >
                    Delete Note
                  </button>
                </li>
              )
            })}
          </ul>
          <Link to="/create-note"><button>Add note</button></Link>

      </div>
    )
  }
}

FolderMain.propTypes = { 
  match: PropTypes.shape({
    params: PropTypes.shape({
      folderid: PropTypes.string.isRequired
    })

})}