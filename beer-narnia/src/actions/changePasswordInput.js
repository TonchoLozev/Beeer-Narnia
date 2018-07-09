import {CHANGE_PASSWORD_INPUT} from '../constants/action-types';

export default (passwordInput) => ({type: CHANGE_PASSWORD_INPUT, payload: { passwordInput }});