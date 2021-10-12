import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

import { mount } from "enzyme";

import { Provider } from "react-redux";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { MemoryRouter } from 'react-router-dom';

import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen /> 
        </MemoryRouter>
    </Provider>
);

describe('Tests on LoginScreen', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });
    
    test('should match with the snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Should call action handleGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect( startGoogleLogin ).toHaveBeenCalledTimes(1);
    })

    test('should call startLogin with the args', () => {
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });
        expect( startLoginEmailPassword ).toHaveBeenCalledWith('test@email.com','Multisucredota95.');
    });

});