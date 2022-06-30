// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial=[]
  const [notes, setNotes] = useState(notesInitial);
   
  //get the note
    const getNotes= async()=>{
      //api call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         'auth-token': localStorage.getItem("token")
       }
     });
      const json = await response.json()
       console.log(json)
      setNotes(json)
   }

   //ADD the note
   const addNote= async(title,description,Note_data)=>{
     //api call
     const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,Note_data})
    });
    const note = await response.json()
    setNotes(notes.concat(note));
     
  }
   //DELETE the node
    const deleteNote= async(id)=>{
      //api call
      const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token")
        }
      });
      const json=  response.json();
      const newNote = notes.filter((notes) => { return notes._id !== id });
    setNotes(newNote);
  }
   //EDIT the node
   const  editNote= async (id,title,description,Note_data)=>{
     //api call
     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,Note_data})
    });
    const json = await response.json()
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id===id) {
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].Note_data=Note_data; 
        break;
      }
     

    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{notes,addNote ,deleteNote,  editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
