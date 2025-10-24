import { useState, useEffect } from "react";
import NoteList from "./NoteList";
import NoteEditor from "./NoteEditor";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState(null);

  // Guardar notas
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Nueva nota",
      content: "",
      date: new Date().toLocaleString(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const updateNote = (id, updatedFields) => {
    setNotes(notes.map(n => (n.id === id ? { ...n, ...updatedFields } : n)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
    setActiveNote(null);
  };

  const currentNote = notes.find(n => n.id === activeNote);

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>🗒️ Mis Notas</h1>
        <button onClick={addNote} className="add-btn">+ Nueva nota</button>
        <NoteList
          notes={notes}
          activeNote={activeNote}
          onSelect={setActiveNote}
          onDelete={deleteNote}
        />
      </aside>

      <main className="main">
        {currentNote ? (
          <NoteEditor note={currentNote} onChange={updateNote} />
        ) : (
          <p className="no-selection">Selecciona o crea una nota</p>
        )}
      </main>
    </div>
  );
}

export default App;
