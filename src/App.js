// src/App.js
import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import NoteInput from './components/NoteInput';
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and Anon Key
const supabaseUrl = 'https://rojqpylyzaaryefgalrp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvanFweWx5emFhcnllZmdhbHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxODcwNjYsImV4cCI6MjA1Nzc2MzA2Nn0.4CbjARN73KTJVma3Yarf2CNT6FyPw2qGW9ENyv_f5Ns';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('notes').select('*').order('id', { ascending: false });
      if (error) {
        console.error('Error fetching notes:', error);
      } else {
        setNotes(data);
      }
    } catch (err) {
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (note) => {
    try {
      const { data, error } = await supabase.from('notes').insert([{ ...note, archived: false }]).select();
      if (error) {
        console.error('Error adding note:', error);
      } else {
        fetchNotes(); // Refresh notes after adding
      }
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) {
        console.error('Error deleting note:', error);
      } else {
        fetchNotes();
      }
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const archiveNote = async (id) => {
    try {
      const noteToUpdate = notes.find((note) => note.id === id);
      const { error } = await supabase.from('notes').update({ archived: !noteToUpdate.archived }).eq('id', id);
      if (error) {
        console.error('Error archiving note:', error);
      } else {
        fetchNotes();
      }
    } catch (err) {
      console.error('Error archiving note:', err);
    }
  };

  const editNote = async (updatedNote) => {
    try {
      const { error } = await supabase.from('notes').update(updatedNote).eq('id', updatedNote.id);
      if (error) {
        console.error('Error editing note:', error);
      } else {
        fetchNotes();
      }
    } catch (err) {
      console.error('Error editing note:', err);
    }
  };

  const changeNoteColor = async (id, color) => {
    try {
      const { error } = await supabase.from('notes').update({ color }).eq('id', id);
      if (error) {
        console.error('Error changing note color:', error);
      } else {
        fetchNotes();
      }
    } catch (err) {
      console.error('Error changing note color:', err);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Simple loading indicator
  }

  return (
    <div className={`p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-200'}`}
          />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`ml-4 p-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <NoteInput onAdd={addNote} darkMode={darkMode} />
        <div className="flex flex-wrap mt-6">
          {filteredNotes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onArchive={archiveNote}
              onEdit={editNote}
              onChangeColor={changeNoteColor}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;