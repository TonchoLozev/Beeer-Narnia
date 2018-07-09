import {Map} from 'immutable';
import {
    INIT_HOME_STORE
} from '../constants/action-types';

const initialState = Map({allBeers: []});

export default (state = initialState, {type, payload}) => { // action = { type, payload }
    switch (type) {
        case INIT_HOME_STORE:
            return state.set('allBeers', payload.allBeers);
        default:
            return state;
    }
};