import {Map} from 'immutable';
import {
    UPDATE_CART_STORE,
    UPDATE_CART_ITEMS
} from '../constants/action-types';

const arrCart = JSON.parse(sessionStorage.getItem('cart'));
const initCart = arrCart === null ? [] : arrCart;
const initialState = Map({cart: initCart});

export default (state = initialState, {type, payload}) => { // action = { type, payload }
    switch (type) {
        case UPDATE_CART_STORE:
            return state.set('cart', payload.cart);
        case UPDATE_CART_ITEMS:
            return state.set('cart', payload.cart);
        default:
            return state;
    }
};