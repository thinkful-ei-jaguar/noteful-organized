import React, { Component } from 'react'
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
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
}
export default class NoteMain extends Component {
  static contextType = NotefulContext;


  render() {
    
    const { notes } = this.context;

    const thisNote = notes.filter (note => note.id == this.props.match.params.noteid);
    const { history } = this.props;
    return (
      <div className="main-main-div">

          <ul className='main-view-main'>
            {thisNote.map((note, i) => {
              return (
                <li className='main-note-list' key={i}>
                  <p>{note.note_name}</p>
                  <p>Last modified: {note.date_modified.slice(0, 10)}</p>
                  <button className='main-note-delete' onClick={() => {
                    deleteBookmarkRequest(
                        note.id,
                        this.context.deleteNote
                        )
                      
                    history.push('/');
                  }}
                    >
                    Delete Note
                  </button>
                  <p>{note.content}</p>
                </li>
              )
            })}
          </ul>
      </div>
    )
  }
}

NoteMain.propTypes = { 
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteid: PropTypes.string.isRequired
    })

})}