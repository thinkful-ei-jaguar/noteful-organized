import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class FolderSidebar extends Component {
 


  render() {
    
    const { folders } = this.props.state;
    
    return (
      <div className='main-sidebar-div'>
        <div className='main-view-sidebar'>
        <ul>
          {folders.map((folder, i) => {
            return (
              <li className='main-folder-list' key={i}>
                <NavLink to={`/folder/${folder.id}`} activeClassName='selectedFolder'> 
                  {folder.folder_name}
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