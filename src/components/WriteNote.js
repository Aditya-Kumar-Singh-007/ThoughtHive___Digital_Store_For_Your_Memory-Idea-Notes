import React, { useState, useContext } from 'react';
import notesContext from '../context/notes/notesContext';
import NoteSubmitModal from './NoteSubmitModal';
import { useNavigate } from 'react-router-dom';




const WriteNote = () => {
  const context=useContext(notesContext);
  const {addnote}=context;
  const[note,setNote]=useState({title:"",description:"",tag:""});
  const[showModal,setShow]= useState(false);
  const[modalTitle,setModalTitle]=useState("");
  const navigate=useNavigate();


  const onchange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  const handleOnClick=(e)=>{
    e.preventDefault();
    addnote(note.title,note.description,note.tag);
    setShow(true); 
    setModalTitle(note.title);
    
  }
  const addAnother=()=>{
    
    setNote({title:"",description:"",tag:""})
    setModalTitle("")

    setShow(false)
  }
  const viewNote=()=>{
    navigate("/getallnotes")
  }

  return (
    <div className="write-note-container">
      <h2 className="write-note-title">Capture Your Thoughts</h2>
      <p className="write-note-tagline">Transform ideas into lasting memories</p>

      <form className="write-note-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            placeholder="Enter note title"
            required
            onChange={onchange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Write your note here..."
            rows="5"
            required
            value={note.description}
            onChange={onchange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={note.tag}
            placeholder="e.g. Personal, Work, Ideas"
            onChange={onchange}
          />
        </div>

        <button disabled={note.title.length<3 || note.description.length<5} type="button" className="submit-btn"  onClick={handleOnClick}>
          Save Note
        </button>
      </form>
      <NoteSubmitModal
      showModal={showModal}
      noteTitle={modalTitle}
      addAnother={addAnother}
      viewNote={viewNote}
      
      
      />
    </div>
  );
};

export default WriteNote;
