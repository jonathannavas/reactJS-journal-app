import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Tests on authReducer.js', () => {

    
    test('Should make an login ', () => {
        
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: '12234',
                displayName: 'Jonathan'
            }
        };
        const state = authReducer( initState, action);
        expect( state ).toEqual( { uid: '12234', name: 'Jonathan' } );

    });

       
    test('Should make an logout ', () => {
        
        const initState = {
            uid: '12234',
            name: 'Jonathan'
        };
        const action = {
            type: types.logout,
        };
        const state = authReducer( initState, action);
        expect( state ).toEqual( {} ); 
    });

    test('Should return the initial state ', () => {
        
        const initState = {
            uid: '12234',
            name: 'Jonathan'
        };
        const action = {
            type: 'cualquier cosa',
        };
        const state = authReducer( initState, action);
        expect( state ).toEqual( initState ); 
    });


});