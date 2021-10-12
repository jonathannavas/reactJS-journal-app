import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { MemoryRouter } from 'react-router';
import { types } from '../../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth:{},
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        notes: [],
        active: null
    }
};
let store = mockStore(initState);

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}));

// store.dispatch = jest.fn();
const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen /> 
        </MemoryRouter>
    </Provider>
);

describe('Tests on RegisterScreen.js', () => {
 


    test('Should make a snapshot', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Should to make a dispatch', () => {
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target:{
                value: '',
                name: 'email'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'Email not valid'
        })


    });

    test('Should to show an error message', () => {
        const initState = {
            auth:{},
            ui:{
                loading: false,
                msgError: 'Email is incorrect'
            }
        };
        const  store = mockStore(initState);
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen /> 
                </MemoryRouter>
            </Provider>
        );


        expect( wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect( wrapper.find('.auth__alert-error').text().trim()).toBe('Email is incorrect');

        
    })

});