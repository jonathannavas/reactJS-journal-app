
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";
//tareas asincronas se pone un callback
export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );

        dispatch( activeNote( doc.id, newNote) );

        dispatch( addNewNote( doc.id, newNote ) );

    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes =  (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes( uid);
        dispatch( setNotes( notes ) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if(!note.url){
            delete note.url;
        }
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        await db.doc(`${uid}/journal/notes/${note.id}`).update( noteToFirestore );
        dispatch( refreshNote(note.id, noteToFirestore) );

        Swal.fire('Saved', note.title, 'success');

    }
}
//funcion sincrona
export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})

//funcion asincrona
export const startUploading = (file) => {
    return async ( dispatch,getState )=>{
        const activeNote = getState().notes.active;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        
        dispatch( startSaveNote( activeNote ) );

        Swal.close();
    }
}
// tarea asincrona
export const startDeleting = (id)=> {
    return async (dispatch, getState) => {
        
        const uid = getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch( deleteNote(id) );

    }
};
// tarea sincrona
export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});