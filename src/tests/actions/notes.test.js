/** * @jest-environment node */


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'GWy2ipA9OmSremU6yBSu',
            title: 'Hello',
            body: 'world'
        }
    }
};
let store = mockStore(initState);

describe('Tests on notes.js', () => {

    beforeEach( () => {
        store = mockStore(initState);
    });

    test('Should create a newNote', async () => {
        
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id:  expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id:  expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number) 
            }
        });

  
        const { id } = actions[0].payload;
        await db.doc(`/TESTING/journal/notes/${id}`).delete();

    });

    test('Should work startLoagingNotes with the notes', async () => {
        await store.dispatch( startLoadingNotes('TESTING') );
        const actions = store.getActions();
        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );

    });

    test('Should update the note with the method startSaveNote', async () => {
        const note = {
            id: 'GWy2ipA9OmSremU6yBSu',
            title: 'Titulo',
            body: 'body'
        }
        await store.dispatch( startSaveNote(note) );

        const actions = store.getActions();
        expect(actions[0].type).toBe( types.notesUpdated );

        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
        expect(docRef.data().title).toBe( note.title );
    });

});