import {SET_LAST_NAME} from '../../constants/action-types';

export default (lastName) => ({type: SET_LAST_NAME, payload: { lastName }});

