import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
export default function Addnote() {
  const { addNote } = useContext(NoteContext);
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
  };

  return (
    <div>
      <h1>Add a note</h1>
      <div>
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
          ></textarea>
        </div>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <h1 className="my-4">View your notes</h1>
    </div>
  );
}
