import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NotificationManager} from 'react-notifications';
import classnames from "classnames";
import {withRouter} from 'react-router-dom';

import Button from '../common/Button/Button.jsx';

import deleteUserStore from '../../actions/deleteUserStore';
import updateIsAdmin from '../../actions/updateIsAdmin';

import {auth} from '../../../utils/auth';
import {isAdmin} from '../../../utils/roles';

class Header extends PureComponent {
    constructor(props) {
        super(props);

        this.logoutFunc = this.logoutFunc.bind(this);
    }

    logoutFunc() {
        const {deleteUserStore, updateIsAdmin, history} = this.props;

        deleteUserStore();
        auth.logout().then(res => {
            sessionStorage.removeItem('roleId');
            sessionStorage.removeItem('authtoken');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('userId');
            updateIsAdmin(isAdmin());
            history.push('/');
        });
        NotificationManager.info('You are logged out now');
    }

    render() {
        const {onClick, username, cartItems, checkIsAdmin} = this.props;
        const itemsInfo = classnames({
            'itemsInfo': true,
            'show': cartItems > 0
        });
        return (<div className="headerNav">
            <div className="cartButton">
                <Button nameClass="navButton" label="Cart" icon="icon-cart" link="/cart" onClick={onClick}/>
                <i className={itemsInfo}>{cartItems}</i>
            </div>
            <Button nameClass="navButton" label="Home" link='/' onClick={onClick}/>
            {username !== '' ? <Button nameClass="navButton" label="Logout" onClick={this.logoutFunc}/> :
                <div className="authBtns">
                    <Button nameClass="navButton" label="Login" link='/login' onClick={onClick}/>
                    <Button nameClass="navButton" label="Register" link='/register' onClick={onClick}/>
                </div>}
        </div>);
    }

}

export default connect(
    state => ({
        username: state.User.get('username'),
        cartItems: state.Cart.get('cartItems'),
    }),
    {
        deleteUserStore,
        updateIsAdmin
    }
)
(withRouter(Header));

Header.propTypes = {
    onClick: PropTypes.func,
    deleteUserStore: PropTypes.func,
    updateIsAdmin: PropTypes.func,
    username: PropTypes.string,
    cartItems: PropTypes.number
};
