/**
 * @jest-environment node
 */
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { login, logout, startLogout, startLoginEmailPassword } from "../../actions/auth";
import { types } from "../../types/types";


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Tests on auth.js', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('Should login with an action', () => {
        const user = {
            uid: '1231231234',
            displayName: 'Gabriel'
        }
        const loginTest = login(user.uid, user.displayName);
        expect( loginTest ).toEqual({
            type: types.login,
            payload: user
        });
    });

    test('Should logout with an action', () => {
        const logoutTest = logout();
        expect( logoutTest ).toEqual({
            type: types.logout
        });
    });

    test('Should to do a startLogout', async () => {
        await store.dispatch( startLogout() );
        const actions = store.getActions();
        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });

    });

    test('Should use startLoginEmailPassword', async () => {

        await store.dispatch( startLoginEmailPassword('test@test.com', '12345Hola.'));
        
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.uiStartLoading
        });
        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'sk3OnjqoDlX8E5bw3AGrCXRjlvf2',
                displayName: null
            }
        });
        expect( actions[2] ).toEqual({
            type: types.uiFinishLoading
        });

    });

});