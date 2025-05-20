// src/components/NoteInput.js
import React, { useState } from 'react';

function NoteInput({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title || content) {
      onAdd({ title, content });
      setTitle('');
      setContent('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md shadow-md p-4 m-2 max-w-lg"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded-md"
      />
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded-md"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 transition-colors duration-300"
      >
        Add Note
      </button>
    </form>
  );
}

export default NoteInput;