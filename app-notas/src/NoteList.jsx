function NoteList({ notes, activeNote, onSelect, onDelete }) {
  return (
    <ul className="note-list">
      {notes.length === 0 && <p>No hay notas aún.</p>}
      {notes.map(note => (
        <li
          key={note.id}
          onClick={() => onSelect(note.id)}
          className={note.id === activeNote ? "active" : ""}
        >
          <div>
            <strong>{note.title}</strong>
            <small>{note.date}</small>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
