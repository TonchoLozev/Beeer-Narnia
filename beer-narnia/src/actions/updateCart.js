import {UPDATE_CART_STORE} from '../constants/action-types';

export default (cart) => ({type: UPDATE_CART_STORE, payload: { cart }});

