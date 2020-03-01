import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class MainSidebar extends Component {
  
  render() {
    
    if (!this.props.values) {
      return <div>Loading...</div>
    }
    return (
      <div className='main-sidebar-div'>
        <div className='main-view-sidebar'>
        <ul>
          {this.props.values.map((folder, i) => {
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

MainSidebar.defaultProps = [];
