import {INIT_USER_STORE} from '../constants/action-types';

export default (username) => ({type: INIT_USER_STORE, payload: { username }});