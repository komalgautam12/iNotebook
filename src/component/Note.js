import React, { useContext,useEffect } from "react";
import Noteitem from "./Noteitem";

import Addnote from "./Addnote";
import NoteContext from "../context/notes/noteContext";
export default function Note() {
  const { notes, getNotes } = useContext(NoteContext);
  useEffect(() => {
    getNotes();
  });

  return (
    <div>
      <Addnote />
      <div className="row my-4">
        {notes.map((element) => {
          return (
            <div className=" col-md-4 my-4" key={element._id}>
              <Noteitem note={element} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
