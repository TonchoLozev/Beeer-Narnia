import {Map} from 'immutable';
import {
    CHANGE_EMAIL_INPUT,
    CHANGE_USERNAME_INPUT,
    CHANGE_PASSWORD_INPUT,
    CHANGE_REPEAT_PASSWORD_INPUT,
    DELETE_EMAIL_INPUT,
    DELETE_USERNAME_INPUT,
    DELETE_PASSWORD_INPUT,
    DELETE_REPEAT_PASSWORD_INPUT
} from '../constants/action-types';

const initialState = Map({usernameInput: '', passwordInput: '', repeatPasswordInput: '', emailInput: ''});

export default (state = initialState, {type, payload}) => { // action = { type, payload }
    switch (type) {
        case CHANGE_USERNAME_INPUT:
            return state.set('usernameInput', payload.usernameInput);
        case CHANGE_PASSWORD_INPUT:
            return state.set('passwordInput', payload.passwordInput);
        case CHANGE_REPEAT_PASSWORD_INPUT:
            return state.set('repeatPasswordInput', payload.repeatPasswordInput);
        case CHANGE_EMAIL_INPUT:
            return state.set('emailInput', payload.emailInput);
        case DELETE_USERNAME_INPUT:
            return state.set('usernameInput', '');
        case DELETE_PASSWORD_INPUT:
            return state.set('passwordInput', '');
        case DELETE_REPEAT_PASSWORD_INPUT:
            return state.set('repeatPasswordInput', '');
        case DELETE_EMAIL_INPUT:
            return state.set('emailInput', '');
        default:
            return state;
    }
};