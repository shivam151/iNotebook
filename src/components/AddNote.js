import React, { useContext,useState } from "react";
import noteContext from "../context/notes/noteContext";
function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title: '', description:'', Note_data : ''})
  const handleclick =(e)=>{
        e.preventDefault();
        addNote(note.title ,note.description, note.Note_data)
        setNote({title: '', description:'', Note_data : ''})
        props.showAlert("Added successfully" , "success")
  }
  const onChange =(e)=>{
    setNote({...note, [e.target.name]:e.target.value});
} 
  return (
    <div className="container my-3 ">
      <h1>Add a notes</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">title </label>
          <input  type="text" className="form-control" id="title" name="title"aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3"><label htmlFor="text" className="form-label"> description </label>
          <input type="text"className="form-control"id="description"name="description" value={note.description} onChange={onChange} minLength={5} required />
        </div>
        
        <div className="mb-3">
          <label htmlFor="Note_data" className="form-label">Tag </label>
          <input  type="text" className="form-control" id="Note_data" name="Note_data"aria-describedby="emailHelp" value={note.Note_data} onChange={onChange} minLength={5} required/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary " onClick={handleclick}>
          ADD Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
