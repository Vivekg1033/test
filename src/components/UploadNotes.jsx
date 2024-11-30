import React, { useState } from 'react';
import './UploadNotes.css';  // Import CSS for styling

function UploadNotes() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);

  // Handle the file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!title || !description || !file) {
      alert('Please fill out all fields');
      return;
    }

    const newNote = {
      title,
      description,
      file: URL.createObjectURL(file),
      date: new Date().toLocaleString(),
    };

    // Add the new note to the list and save it in localStorage
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    // Reset the form fields
    setTitle('');
    setDescription('');
    setFile(null);
  };

  // Handle deleting a note
  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="upload-notes">
      <div className="form-container">
        <h2>Upload Your Notes</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Short Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept="application/pdf, image/*"
              required
            />
          </div>
          <button type="submit">Upload Note</button>
        </form>
      </div>

      <h3>Uploaded Notes</h3>
      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes uploaded yet!</p>
        ) : (
          notes.map((note, index) => (
            <div className="note-card" key={index}>
              <h4>{note.title}</h4>
              <p>{note.description}</p>
              <small>{note.date}</small>
              <br />
              <a href={note.file} target="_blank" rel="noopener noreferrer">
                View Note
              </a>
              <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UploadNotes;
