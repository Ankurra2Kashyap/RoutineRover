import React from 'react'
import noteContext from "../Context/notes/noteContext"
import { useContext } from 'react'
const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const {note,updateNote}=props;

    return (
        <div className="col-md-3" style={{ marginLeft: '10rem' }}>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: 'center' }}>{note.title}</h5>
                    <p className="card-text" style={{ textAlign: 'center' }}>{note.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="far fa-trash-alt" style={{ fontSize: '1.5em', margin: '1rem' }} onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success")}}></i>
                        <i className="fa-solid fa-pen-to-square" style={{ fontSize: '1.5em', margin: '1rem' }} onClick={()=>{updateNote(note)}}></i>
                    </div>
                </div>
            </div>      
        </div>
         
    )
}

export default Noteitem
