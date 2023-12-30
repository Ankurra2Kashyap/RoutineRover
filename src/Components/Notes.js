import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../Context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, EditNote } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };

    const handleClick = (e) => {
        e.preventDefault();
        EditNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    };

    const onChange = (e) => {
        console.log("Updating the note...", note);
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group my-3">
                                    <label htmlFor="title" style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={note.etitle} minLength={5} required />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="edescription" style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" placeholder="description" onChange={onChange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="tag" style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" placeholder="tag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2 style={{ marginLeft: '10rem' }}>Your Notes</h2>
                {notes && notes.length === 0 && 'No notes to Display'}
                {Array.isArray(notes) && notes.map((note) => (
                    <Noteitem key={note.id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                ))}
            </div>
        </>
    );
};

export default Notes;
