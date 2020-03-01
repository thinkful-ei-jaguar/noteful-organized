import React from 'react';

const NotefulContext = React.createContext({
  folders: [
    {
      id: 0,
      folder_name: "name"
    }
  ],
  notes: [
    {
      id: 0,
      note_name: "name",
      date_modified: "now",
      folder_id: 0,
      content: "content"
    }
  ],
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {}
});

export default NotefulContext;