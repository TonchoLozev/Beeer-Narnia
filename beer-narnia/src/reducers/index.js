import { combineReducers } from 'redux';
import Register from './RegisterReducer';
import Login from './LoginReducer';
import User from './UserReducer';
import Home from './HomeReducer';
import Cart from './CartReducer';

export default combineReducers({
    Register,
    Login,
    User,
    Home,
    Cart
});