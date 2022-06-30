import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
function Notes(props) {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes,editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes();
        // eslint-disable-next-line
        }else{
            navigate('/login')
        }
      // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNode = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, eNote_data: currentNote.Note_data });
    
  };

  const [note, setNote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    eNote_data: "",
  });
  const handleclick = (e) => {
    
    editNote(note.id, note.etitle, note.edescription, note.eNote_data)
    refClose.current.click();
    props.showAlert("Updated successfully" , "success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
              <h5 className="modal-title" id="exampleModalLabel">
                Edit node{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    title{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">
                    {" "}
                    description{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                   minLength={5} required                   
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="Note_data" className="form-label">
                    Tag{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eNote_data"
                    name="eNote_data"
                    value={note.eNote_data}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleclick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddNote  showAlert={props.showAlert}/>
      <div className="row my-3 ">
        <h1>your notes</h1>
        <div className="container mx-2">
        {notes.length===0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} showAlert={props.showAlert} updateNode={updateNode} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
