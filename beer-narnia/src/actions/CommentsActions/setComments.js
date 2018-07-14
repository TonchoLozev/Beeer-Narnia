import {SET_COMMENTS} from '../../constants/action-types';

export default (comments) => ({type: SET_COMMENTS, payload: { comments }});

