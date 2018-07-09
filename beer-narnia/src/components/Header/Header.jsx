import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {auth} from '../../../utils/auth';
import {connect} from 'react-redux';
import {NotificationManager} from 'react-notifications';

import Button from '../common/Button/Button.jsx';

import deleteUserStore from '../../actions/deleteUserStore';

class Header extends PureComponent {
    constructor(props) {
        super(props);

        this.logoutFunc = this.logoutFunc.bind(this);
    }

    logoutFunc() {
        const {deleteUserStore} = this.props;

        deleteUserStore();
        auth.logout().then(sessionStorage.clear());
        NotificationManager.info('You are logged out now');
        auth.login('guest', 'guest').then(res => sessionStorage.setItem('authtoken', res._kmd.authtoken));
    }

    render() {
        const {onClick, username} = this.props;
        return (<div className="headerNav">
            <Button nameClass="navButton" label="Cart"/>
            <Button nameClass="navButton" label="Home" link='/' onClick={onClick}/>
            {username !== '' ?
                <Button nameClass="navButton" label="Logout" onClick={this.logoutFunc}/> :
                <div className="authBtns">
                    <Button nameClass="navButton" label="Login" link='/login' onClick={onClick}/>
                    <Button nameClass="navButton" label="Register" link='/register' onClick={onClick}/>
                </div>}
        </div>);
    }

}

export default connect(
    state => ({
        username: state.User.get('username')
    }),
    {
        deleteUserStore
    }
)(Header);

Header.propTypes = {
    onClick: PropTypes.func,
    deleteUserStore: PropTypes.func,
    username: PropTypes.string
};
