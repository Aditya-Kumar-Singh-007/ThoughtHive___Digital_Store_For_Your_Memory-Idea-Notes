import { useState } from "react";
import notesContext from "./notesContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_API_BASE_URL || "https://thoughthive-backend.onrender.com";
  const initialNotes = [];

  const [notes, setNote] = useState(initialNotes);
  const [loading, setLoading] = useState(false);

  // get all notes--------------------------------------------------------
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${host}/api/notes/getallnotes`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setNote(json);
    } catch (error) {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  //add note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    setNote(notes.concat(json.note));
  };

  //delete node
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNote(newNotes);
  };

  // edit note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    // lOgic for edit
    setNote(
      notes.map((note) =>
        note._id === id ? { ...note, title, description, tags: tag } : note
      )
    );
  };

  return (
    <notesContext.Provider
      value={{ notes, setNote, addnote, deleteNote, fetchNotes, editNote, loading }}
    >
      {props.children}
    </notesContext.Provider>
  );
};

export default NoteState;
