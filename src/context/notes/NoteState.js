import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const allNote = [];
  //Notes State
  const [notes, setnotes] = useState(allNote);
  const host = "http://localhost:5000/api/notes";
  const jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmFkYmY4MTExNjM5OWQyMDM2ZWY3YSIsImlhdCI6MTY3MzM3MTM0NSwiZXhwIjoxNjczNDU3NzQ1fQ.cSPI5pT_8OVbT4C4RWsppyzmGLSMvGoKX-QieAdipoY";
  //getting all notes

  const getNotes = async () => {
    //API call
    const url = `${host}/getAllNotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        jwt,
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
        jwt,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tags }),
    });
    const data = await response.json();
    setnotes(notes.concat(data));
  };

  //updatind or editing a notes

  const editNote = async (id, note) => {
    const { etitle: title, edescription: description, etags: tags } = note;
    //API call
    const url = `${host}/updateNotes/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        jwt,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tags }),
    });
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tags = tags;
        break;
      }
    }
    setnotes(newNotes);
    const data = await response.json();
    console.log(data);
  };

  // deleting a note

  const deleteNote = async (id) => {
    //API call
    const url = `${host}/deleteNotes/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        jwt,
        "Content-Type": "application/json",
      },
    });
    console.log(await response.json());
    const n = notes.filter((ele) => ele._id !== id);
    setnotes(n);
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
