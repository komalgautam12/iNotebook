import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
export default function Addnote() {
  const { addNote,showalert } = useContext(NoteContext);
 
  const [note, setnote] = useState({
    title: "",
    description: "",
    tags: "default",
  });
  const change = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note);
    showalert("note added Sucessfully" ,"Success")
    setnote({title:"",description:"",tags:""})
  };

  return (
    <div>
      <h1>Add a note</h1>
      <form  onSubmit={handleSubmit}>
        <div className="mb-3 my-4">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="title"
            placeholder="future Goal"
            onChange={change}
            value={note.title}
            min="5"
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            name="tags"
            placeholder="IMPORTANT!"
            onChange={change}
            value={note.tags}
            minLength="5"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Add Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            name="description"
            rows="3"
            onChange={change}
            value={note.description}
            min="5"
          ></textarea>
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary"
           
            // disabled={note.title.length<5||note.description.length<5}
          >
            Submit
          </button>
        </div>
      </form>
      <h1 className="my-4">View your notes</h1>
      
    </div>
  );
}
