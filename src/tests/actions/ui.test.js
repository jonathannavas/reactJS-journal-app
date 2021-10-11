import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Tests on ui.js', () => {

    test('All the funciones must be active', () => {
        const action = setError('404');
        expect( action ).toEqual({
            type: types.uiSetError,
            payload: '404'
        });

        const removeErrorAction = removeError();
        expect( removeErrorAction ).toEqual( {
            type: types.uiRemoveError
        })

        const startLoadingAction = startLoading();
        expect( startLoadingAction ).toEqual({
            type: types.uiStartLoading
        });

        const finishLoadingAction = finishLoading();
        expect( finishLoadingAction ).toEqual({
            type: types.uiFinishLoading
        });

    });

});