import {CHANGE_REPEAT_PASSWORD_INPUT} from '../constants/action-types';

export default (repeatPasswordInput) => ({type: CHANGE_REPEAT_PASSWORD_INPUT, payload: { repeatPasswordInput }});