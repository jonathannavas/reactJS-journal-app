import React from 'react';

import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { getAuth,  signInWithEmailAndPassword } from '@firebase/auth';


import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';
import { act } from 'react-dom/test-utils';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC'
        },
        notes: []
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

describe(' Tests on AppRouter.js ', () => {

    test('Should to call login if im authenticated', async () => {

        let user;

        await act( async () => {

            const auth = getAuth();
            const userCred = await signInWithEmailAndPassword(auth, 'test@test.com', '12345Hola.');
            user = userCred.user;
 
            const wrapper = mount( 
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter /> 
                    </MemoryRouter>
                </Provider>
            )
            
        })
        
        expect( login ).toHaveBeenCalledWith('sk3OnjqoDlX8E5bw3AGrCXRjlvf2', null);
    });

});