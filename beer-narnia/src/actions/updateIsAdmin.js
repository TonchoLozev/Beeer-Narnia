import {UPDATE_IS_ADMIN} from '../constants/action-types';

export default (checkIsAdmin) => ({type: UPDATE_IS_ADMIN, payload: { checkIsAdmin }});