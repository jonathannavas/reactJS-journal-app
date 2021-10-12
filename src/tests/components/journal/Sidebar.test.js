import React from 'react';

import { mount } from "enzyme";
import { Provider } from "react-redux";
import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));
jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
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
        active: null,
        notes: []
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();


describe('Tests on Sidebar.js', () => {
   
    const wrapper = mount( 
        <Provider store={ store }>
            <Sidebar /> 
        </Provider>
    )
    

    test('Should show a snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should call startLogout', () => {
        wrapper.find('button').prop('onClick')();
        expect( startLogout ).toHaveBeenCalled();
    });

    test('should to call startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();
    });

});
