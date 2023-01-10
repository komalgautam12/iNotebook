import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const allNote = [];
  //Notes State
  const [notes, setnotes] = useState(allNote);
  const host = "http://localhost:5000/api/notes";

  //getting all notes
  const getNotes = async () => {
    const url = `${host}/getAllNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmFkYmY4MTExNjM5OWQyMDM2ZWY3YSIsImlhdCI6MTY3MzI4NDY2MywiZXhwIjoxNjczMzcxMDYzfQ.b1CMeA4Ys5cvK5y-Z5iGOFk9UZzD6Ptfqgw4fQKsbdc",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setnotes(data);
  };

  //adding a notes
  const addNote = async (note) => {
    const { title, description, tags } = note;
    //API call
    const url = `${host}/saveNotes`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmFkYmY4MTExNjM5OWQyMDM2ZWY3YSIsImlhdCI6MTY3MzI4NDY2MywiZXhwIjoxNjczMzcxMDYzfQ.b1CMeA4Ys5cvK5y-Z5iGOFk9UZzD6Ptfqgw4fQKsbdc",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const data = await response.json();
    setnotes(notes.concat(data));
  };

  //updatind or editing a notes
  const editNote = async (id, note) => {
    const { title, description, tags } = note;
    const url = `${host}/updateNotes/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmFkYmY4MTExNjM5OWQyMDM2ZWY3YSIsImlhdCI6MTY3MzI4NDY2MywiZXhwIjoxNjczMzcxMDYzfQ.b1CMeA4Ys5cvK5y-Z5iGOFk9UZzD6Ptfqgw4fQKsbdc",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const data = await response.json();
    
  };



  // deleting a note
  const deleteNote = async (id) => {
    //API call
    const url = `${host}/deleteNotes/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmFkYmY4MTExNjM5OWQyMDM2ZWY3YSIsImlhdCI6MTY3MzI4NDY2MywiZXhwIjoxNjczMzcxMDYzfQ.b1CMeA4Ys5cvK5y-Z5iGOFk9UZzD6Ptfqgw4fQKsbdc",
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, getNotes, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
