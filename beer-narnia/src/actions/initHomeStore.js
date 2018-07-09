import {INIT_HOME_STORE} from '../constants/action-types';

export default (allBeers) => ({type: INIT_HOME_STORE, payload: { allBeers }});