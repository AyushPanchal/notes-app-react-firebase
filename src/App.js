import React, { useEffect, useState } from 'react'
import Note from './Note'
import { db } from './firebase'
import { collection, add, doc, query, onSnapshot, addDoc, deleteDoc } from "firebase/firestore";
const App = () => {

  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');

  async function createNote() {
    console.log(note)
    if (note === '') {
      return
    }
    await addDoc(collection(db, 'Notes'), {
      note: note
    }).then(() => { setNote('') })
  }

  async function getNotes() {
    const q = query(collection(db, 'Notes'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesArray = [];
      snapshot.forEach((doc) => {
        notesArray.push({ ...doc.data() , id: doc.id});
      });
      setNotes(notesArray);
    });
    return () => unsubscribe();
  }

  async function deleteNote(id) {
    console.log("first")
    console.log(id);
    // await deleteDoc(collection(db,'Notes',id))
    const noteRef = doc(db, "Notes", id);
    await deleteDoc(noteRef);
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className='p-4 bg-gray-900 text-white h-screen w-screen'>
      <h1>Notes App</h1>
      <form onSubmit={createNote} className='flex flex-col mt-2  bg-black p-2 rounded-xl'>
        <label htmlFor="noteId">Add Note</label>
        <div className="flex items-center my-2">
          <input type="text" id='noteId' value={note} onChange={(event) => { setNote(event.target.value) }} className='px-2 outline-none text-black py-1 flex-grow rounded-lg' placeholder='Note...' required />
          <div onClick={createNote} className='bg-white cursor-pointer text-black p-1 rounded-lg ml-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          </div>
        </div>
      </form>

      {
        notes.map((note) => {
          console.log(note.id);
          return <Note note={note} key={note.id} onDelete={deleteNote}/>
        })
      }

    </div>
  )
}

export default App