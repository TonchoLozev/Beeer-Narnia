import {Map} from 'immutable';
import {
    CHANGE_USERNAME_INPUT,
    CHANGE_PASSWORD_INPUT,
    DELETE_USERNAME_INPUT,
    DELETE_PASSWORD_INPUT,
} from '../constants/action-types';

const initialState = Map({usernameInput: '', passwordInput: ''});

export default (state = initialState, {type, payload}) => { // action = { type, payload }
    switch (type) {
        case CHANGE_USERNAME_INPUT:
            return state.set('usernameInput', payload.usernameInput);
        case CHANGE_PASSWORD_INPUT:
            return state.set('passwordInput', payload.passwordInput);
        case DELETE_USERNAME_INPUT:
            return state.set('usernameInput', '');
        case DELETE_PASSWORD_INPUT:
            return state.set('passwordInput', '');
        default:
            return state;
    }
};