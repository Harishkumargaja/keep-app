// src/components/Note.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Note({ note, onDelete, onArchive, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleEdit = () => {
    if (isEditing) {
      onEdit({ ...note, title: editedTitle, content: editedContent });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 hover:shadow-lg transition-shadow duration-300">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded-md"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </>
      ) : (
        <>
          <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
          <p className="text-sm">{note.content}</p>
        </>
      )}
      <div className="mt-2 flex justify-between">
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-300"
        >
          Delete
        </button>
        <button
          onClick={() => onArchive(note.id)}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          {note.archived ? 'Unarchive' : 'Archive'}
        </button>
        <button onClick={handleEdit} className="transition-colors duration-300 hover:text-blue-600">
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
}
Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Note;