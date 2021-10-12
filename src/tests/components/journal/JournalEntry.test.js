import React from 'react';

import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { types } from '../../../types/types';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {}

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://hola.jpg'
}

describe('Tests on JournalEntry.js', () => {

    const wrapper = mount( 
        <Provider store={ store }>
            <JournalEntry {...note} /> 
        </Provider>
    );

    test('Should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should active a note', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: types.notesActive,
            payload: note
        });

        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote( note.id, { ...note } )
        );
    });

});