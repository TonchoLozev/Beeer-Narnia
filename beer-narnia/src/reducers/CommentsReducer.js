import {Map} from 'immutable';
import {
    SET_COMMENT,
    SET_COMMENTS
} from '../constants/action-types';

const initialState = Map({comments: [], postComment: ''});

export default (state = initialState, {type, payload}) => { // action = { type, payload }
    switch (type) {
        case SET_COMMENT:
            return state.set('postComment', payload.postComment);
        case SET_COMMENTS:
            return state.set('comments', payload.comments);
        default:
            return state;
    }
};