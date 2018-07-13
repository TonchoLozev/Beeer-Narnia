import {UPDATE_CART_ITEMS} from '../constants/action-types';

export default (cartItems) => ({type: UPDATE_CART_ITEMS, payload: { cartItems }});