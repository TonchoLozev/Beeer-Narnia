import { combineReducers } from 'redux';
import Register from './RegisterReducer';
import Login from './LoginReducer';
import User from './UserReducer';
import Home from './HomeReducer';
import Cart from './CartReducer';
import Beer from './BeerDetailsReducer'
import RequestAccess from './RequestAccessReducer';
import Requests from './RequestsReducer'
import Comments from './CommentsReducer';

export default combineReducers({
    Register,
    Login,
    User,
    Home,
    Cart,
    Beer,
    RequestAccess,
    Requests,
    Comments
});