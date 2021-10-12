import React from 'react';

import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1234',
        name: 'Jonathan'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 1234,
            title: 'Hola',
            body: 'Mundo',
            date: 0
        },
        notes: []
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();


describe('Tests on NoteScreen.js', () => {

    const wrapper = mount( 
        <Provider store={ store }>
            <NoteScreen  /> 
        </Provider>
    )

    
    test('Should show correctly snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should call activeNote', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target:{
                name: 'title',
                value: 'hola de nuevo'
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith( 
            1234, {
                body: 'Mundo',
                title: 'hola de nuevo',
                id: 1234,
                date: 0
            }
        );
    })

});