import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NotificationManager} from 'react-notifications';

import Button from '../common/Button/Button.jsx';
import Input from '../common/Input/Input.jsx';

import initUserStore from '../../actions/initUsersStore';
import changeUsernameInput from '../../actions/changeUsernameInput';
import changePasswordInput from '../../actions/changePasswordInput';
import deleteUsernameInput from '../../actions/deleteUsernameInput';
import deletePasswordInput from '../../actions/deletePasswordInput';
import validateLogin from '../../helpers/validateLogin';

import {auth} from '../../../utils/auth';




class Login extends PureComponent {
    constructor(props) {
        super(props);

        this.state = ({showPasswordEvent: false});

        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.deleteUsername = this.deleteUsername.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.onEnterPres = this.onEnterPres.bind(this);
        this.sendInfo = this.sendInfo.bind(this);

    }

    componentWillUnmount() {
        const {deletePasswordInput, deleteUsernameInput} = this.props;

        deletePasswordInput();
        deleteUsernameInput();
    }

    changeUsername(event) {
        const username = event.target.value;
        const {changeUsernameInput} = this.props;

        changeUsernameInput(username);
    }

    deleteUsername() {
        const {deleteUsernameInput} = this.props;
        deleteUsernameInput();
    }

    changePassword(event) {
        const password = event.target.value;
        const {changePasswordInput} = this.props;

        changePasswordInput(password);
    }

    async sendInfo() {
        const {
            usernameInput,
            passwordInput,
            deletePasswordInput,
            deleteUsernameInput,
            initUserStore,
            history
        } = this.props;

        if (!validateLogin(usernameInput, passwordInput)) {
            auth.login(usernameInput, passwordInput).then(userInfo => {
                auth.saveSession(userInfo);

                let roleId = userInfo._kmd.roles[0].roleId;
                sessionStorage.setItem('roleId', roleId);

                initUserStore(userInfo.username);
                deletePasswordInput();
                deleteUsernameInput();

                history.push('/');

                NotificationManager.success('Successfully logged in');
            }).catch(() => NotificationManager.error('Invalid credentials'));
        } else {
            NotificationManager.error('Invalid credentials');
        }
    }

    showPassword() {
        this.setState({showPasswordEvent: !this.state.showPasswordEvent});
    }

    onEnterPres(event) {
        if (event.keyCode === 13) { // enter
            this.sendInfo();
        }
    }

    render() {
        const {usernameInput, passwordInput} = this.props;
        return (
            <div className="form-login">
                <div className="login" onKeyUp={this.onEnterPres}>
                    <p className="loginTitle">Log in</p>
                    <Input
                        value={usernameInput}
                        onChange={this.changeUsername}
                        label='User Name' type='text'
                        name="username"
                        placeholder='e.g John.cena'
                        nameClass="input"
                        iconClass="icon-cross"
                        onClick={this.deleteUsername}
                        id="usernameInput"
                    />
                    <Input
                        value={passwordInput}
                        onChange={this.changePassword}
                        label='Password'
                        type={this.state.showPasswordEvent ? 'text' : 'password'}
                        name='password'
                        nameClass="input"
                        iconClass="icon-eye"
                        onMouseDown={this.showPassword}
                        onMouseUp={this.showPassword}
                        id="passwordInput"
                    />
                    <div className="login-buttons">
                        <Button
                            onClick={this.sendInfo}
                            label="Log in"
                            nameClass="login-btn"
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(
    state => ({
        usernameInput: state.Login.get('usernameInput'),
        passwordInput: state.Login.get('passwordInput'),
    }),
    {
        initUserStore,
        changeUsernameInput,
        changePasswordInput,
        deleteUsernameInput,
        deletePasswordInput,
    }
)(Login);

Login.propTypes = {
    initUserStore: PropTypes.func,
    changeUsernameInput: PropTypes.func,
    changePasswordInput: PropTypes.func,
    deleteUsernameInput: PropTypes.func,
    deletePasswordInput: PropTypes.func,
    usernameInput: PropTypes.string,
    passwordInput: PropTypes.string,
    history: PropTypes.object
};