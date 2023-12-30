import React from 'react'
import noteContext from "../Context/notes/noteContext"
import { useContext , useState } from 'react';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        {addNote(note.title,note.description,note.tag)};
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","success")
       
    }
    const onChange = (e)=>{
         setNote({...note , [e.target.name]:e.target.value})
        //  setNote=({title:"",description:"",tag:"default"})
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add Notes</h2>
                <form>
                    <div className="form-group my-3">
                        <label htmlFor="title" style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter email" value={note.title}  onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="description" style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Description</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="description" value={note.description}   onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="tag" style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="tag" value={note.tag}  onChange={onChange}/>
                    </div>
                     
                    <button disabled = {note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
