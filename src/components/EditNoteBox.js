import React, {useState, useEffect } from 'react'


const EditNoteBox = ({note, onSave, onCancel}) => {

  const [editedNote, setEditedNote] = useState({id:"",title: "", description: "", tag: ""});

  useEffect(() => {
    if (note) {
      setEditedNote({
        id:note._id,
        title: note.title || "",
        description: note.description || "",
        tag: note.tags || note.tag || ""
      });
    }
  }, [note]);

  const handleChange = (e) => {
    
    setEditedNote({...editedNote, [e.target.name]: e.target.value});
  };

  const handleSave = () => {
    onSave(editedNote.id, editedNote.title, editedNote.description, editedNote.tag);
    
  };


  return (
    <div className="edit-modal-overlay" onClick={onCancel}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-modal-header">
          <h2 className="edit-modal-title">Refine Your Ideas</h2>
          <p className="edit-modal-tagline">Perfect your thoughts, enhance your story</p>
          <button className="edit-modal-close" onClick={onCancel}>
            ×
          </button>
        </div>
        
        <div className="edit-modal-body">
          <form>
            <div className="edit-form-group">
              <label className="edit-form-label">Title</label>
              <input
                type="text"
                className="edit-form-input"
                name="title"
                value={editedNote.title}
                onChange={handleChange}
                placeholder="Enter note title"
              />
            </div>
            
            <div className="edit-form-group">
              <label className="edit-form-label">Description</label>
              <textarea
                className="edit-form-textarea"
                name="description"
                rows="4"
                value={editedNote.description}
                onChange={handleChange}
                placeholder="Write your note here..."
              ></textarea>
            </div>
            
            <div className="edit-form-group">
              <label className="edit-form-label">Tag</label>
              <input
                type="text"
                className="edit-form-input"
                name="tag"
                value={editedNote.tag}
                onChange={handleChange}
                placeholder="e.g. Personal, Work, Ideas"
              />
            </div>
          </form>
        </div>
        
        <div className="edit-modal-footer">
          <button className="edit-btn edit-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button 
            disabled={editedNote.title.length < 3 || editedNote.description.length < 5} 
            className="edit-btn edit-btn-save" 
            onClick={handleSave}
          >
            Update Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditNoteBox
