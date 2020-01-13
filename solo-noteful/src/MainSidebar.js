import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import NotefulContext from './NotefulContext'

export default class MainSidebar extends Component {
  static contextType = NotefulContext;
  
  render() {
    
    const { folders } = this.context;
    return (
      <div className='main-sidebar-div'>
        <div className='main-view-sidebar'>
        <ul>
          {folders.map((folder, i) => {
            return (
              <li className='main-folder-list' key={i}>
                <NavLink to={`/folder/${folder.id}`} activeClassName='selectedFolder'> 
                {folder.name}
                </NavLink>
              </li>
            )
          })}
        </ul>
        <button>Add folder</button>
        </div>
      </div>
    )
  }
}
