import React, { Component } from 'react'
import NotefulContext from './NotefulContext'

function deleteBookmarkRequest(noteId, callback) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
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
export default class NoteMain extends Component {
  static contextType = NotefulContext;


  render() {
    
    const { notes } = this.context;
    const thisNote = notes.filter (note => note.id === this.props.match.params.noteid);
    const { history } = this.props;
    return (
      <div className="main-main-div">

          <ul className='main-view-main'>
            {thisNote.map((note, i) => {
              return (
                <li className='main-note-list' key={i}>
                  <p>{note.name}</p>
                  <p>Last modified: {note.modified.slice(0, 10)}</p>
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