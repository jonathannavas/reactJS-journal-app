import { types } from '../../types/types';

describe('Tests on types.js', () => {

    test('Should get the same array into types.js', () => {

        const typesNew = {
    
            login: '[auth] login',
            logout: '[logout] logout',
        
            uiSetError: '[UI] set error',
            uiRemoveError: '[UI] remove error',
        
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
        
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Update note saved',
            notesFileUrl: '[Notes] Update image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        
        }

        expect( typesNew ).toEqual( types );

    })

});