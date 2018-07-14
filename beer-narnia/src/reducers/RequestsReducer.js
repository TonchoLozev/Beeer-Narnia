import {Map} from 'immutable';
import {
    SET_REQUESTS
} from '../constants/action-types';

const initialState = Map({requests: []});

export default (state = initialState, {type, payload}) => { // action = { type, payload }
    switch (type) {
        case SET_REQUESTS:
            return state.set('requests', payload.requests);
        default:
            return state;
    }
};