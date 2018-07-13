import {Map} from 'immutable';
import {
    INIT_USER_STORE,
    DELETE_USER_STORE,
    UPDATE_IS_ADMIN
} from '../constants/action-types';
import {isAdmin} from '../../utils/roles';

const initUser = sessionStorage.getItem('username') === null ? '' : sessionStorage.getItem('username');
const initialState = Map({username: initUser, checkIsAdmin: isAdmin()});

export default (state = initialState, {type, payload}) => { // action = { type, payload }
    switch (type) {
        case INIT_USER_STORE:
            return state.set('username', payload.username);
        case DELETE_USER_STORE:
            return state.set('username', '');
        case UPDATE_IS_ADMIN:
            return state.set('checkIsAdmin', payload.checkIsAdmin);
        default:
            return state;
    }
};