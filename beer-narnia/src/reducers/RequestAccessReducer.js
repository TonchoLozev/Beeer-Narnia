import {Map} from 'immutable';
import {
    SET_FIRST_NAME,
    SET_LAST_NAME,
    SET_REASON,
    DELETE_FIRST_NAME,
    DELETE_LAST_NAME,
    DELETE_REASON
} from '../constants/action-types';

const initialState = Map({firstName: '', lastName: '', reason: ''});

export default (state = initialState, {type, payload}) => { // action = { type, payload }
    switch (type) {
        case SET_FIRST_NAME:
            return state.set('firstName', payload.firstName);
        case SET_LAST_NAME:
            return state.set('lastName', payload.lastName);
        case SET_REASON:
            return state.set('reason', payload.reason);
        case DELETE_FIRST_NAME:
            return state.set('firstName', '');
        case DELETE_LAST_NAME:
            return state.set('lastName', '');
        case DELETE_REASON:
            return state.set('reason', '');
        default:
            return state;
    }
};