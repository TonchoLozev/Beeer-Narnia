import {SET_COMMENT} from '../../constants/action-types';

export default (postComment) => ({type: SET_COMMENT, payload: { postComment }});

