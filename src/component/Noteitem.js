import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
export default function Noteitem(props) {
  const { deleteNote, editNote } = useContext(NoteContext);
  let { note } = props;
  //deleting a note
  const handleDelete = () => {
    deleteNote(note._id);
  };

  //editing a note
  const handleEdit = () => {
    editNote(note._id);
  };

  return (
    <>
      {/* modal */}
      <div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Title
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">...</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* note */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-title noteItemTag">{note.tags}</p>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={handleEdit}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          ></i>
          <i className="fa-solid fa-trash mx-2" onClick={handleDelete}></i>
        </div>
      </div>
    </>
  );
}
