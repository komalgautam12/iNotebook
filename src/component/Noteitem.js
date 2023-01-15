import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
export default function Noteitem(props) {
  const { deleteNote,showalert } = useContext(NoteContext);
  let { note, updateNotes } = props;
  //deleting a note
  const handleDelete = () => {
    deleteNote(note._id);
    showalert("note deleted Sucessfully" ,"Success")
  };

  //editing a note

  return (
    <>
      {/* note */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-title noteItemTag">{note.tags}</p>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={()=>{updateNotes(note)}}
          ></i>
          <i className="fa-solid fa-trash mx-2" onClick={handleDelete}></i>
        </div>
      </div>
    </>
  );
}
