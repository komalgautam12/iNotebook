import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";

import Addnote from "./Addnote";
import NoteContext from "../context/notes/noteContext";
export default function Note() {
  const { notes, getNotes,editNote } = useContext(NoteContext);
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const [note, setnote] = useState({
    etitle: "",
    edescription: "",
    etags: "default",
    id:""
  });

  //modal opening logic
  const ref = useRef(null);
  const updateNotes = (cureentNote) => {
    const { title, description, tags ,_id} = cureentNote;
    ref.current.click();
    setnote({ etitle: title, etags: tags, edescription: description ,id:_id});
    
  };

  //update note

  const change = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
   
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(note)
    editNote(note.id,note)
  };

  return (
    <div>
      {/* modal */}
      <div>
        <button
          type="button"
          ref={ref}
          className="d-none btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3 ">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="etitle"
                    placeholder="future Goal"
                    onChange={change}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3 ">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    name="etags"
                    placeholder="IMPORTANT!"
                    onChange={change}
                    value={note.etags}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Add Description
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    name="edescription"
                    rows="3"
                    onChange={change}
                    value={note.edescription}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Addnote />
      <div className="row my-4">
        {notes.map((element) => {
          return (
            <div className=" col-md-4 my-4" key={element._id}>
              <Noteitem note={element} updateNotes={updateNotes} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
