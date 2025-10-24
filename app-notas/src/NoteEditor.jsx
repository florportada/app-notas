import { useEffect, useState } from "react";

function NoteEditor({ note, onChange }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // Actualizar los campos locales cuando cambie la nota seleccionada
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  // Guardar automáticamente
  useEffect(() => {
    const delay = setTimeout(() => {
      onChange(note.id, { title, content });
    }, 400);
    return () => clearTimeout(delay);
  }, [note.id, title, content]);
  
  return (
    <div className="editor">
      <input
        className="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="content-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe aquí..."
      />
    </div>
  );
}

export default NoteEditor;
