import React, { Component } from 'react'

export default class NoteMain extends Component {
 


  render() {
    
    const { notes } = this.props.state;
    const thisNote = notes.filter (note => note.id == this.props.match.params.noteid)
    return (
      <div className="main-main-div">

          <ul className='main-view-main'>
            {thisNote.map((note, i) => {
              return (
                <li className='main-note-list' key={i}>
                  <p>{note.note_name}</p>
                  <p>Last modified: {note.date_modified.slice(0, 10)}</p>
                  <button className='main-note-delete'>Delete Note</button>
                  <p>{note.content}</p>
                </li>
              )
            })}
          </ul>
          <button>Add note</button>

      </div>
    )
  }
}