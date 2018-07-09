import { combineReducers } from 'redux';
import Register from './RegisterReducer';
import Login from './LoginReducer';
import User from './UserReducer';
import Home from './HomeReducer';

export default combineReducers({
    Register,
    Login,
    User,
    Home
});