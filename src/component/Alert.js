import React,{useContext} from 'react'
import NoteContext from "../context/notes/noteContext";

export default function Alert() {
    const { alert } = useContext(NoteContext);
     return (
    <div style={{height:"50px"}}>
    {alert &&
    <div>
     <div class="alert alert-warning alert-dismissible fade show" role="alert">
     <strong>{  alert.type}</strong>: {alert.msg}
        
      </div>
</div>}
    </div>
  )
}
