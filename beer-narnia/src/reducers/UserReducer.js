import {Map} from 'immutable';
import {
    INIT_USER_STORE,
    DELETE_USER_STORE
} from '../constants/action-types';

const initUser = sessionStorage.getItem('username') === null ? '' : sessionStorage.getItem('username');
const initialState = Map({username: initUser});

export default (state = initialState, {type, payload}) => { // action = { type, payload }
    switch (type) {
        case INIT_USER_STORE:
            return state.set('username', payload.username);
        case DELETE_USER_STORE:
            return state.set('username', '');
        default:
            return state;
    }
};