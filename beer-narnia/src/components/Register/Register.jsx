import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NotificationManager} from 'react-notifications';

import Button from '../common/Button/Button.jsx';
import Input from '../common/Input/Input.jsx';

import initUserStore from '../../actions/initUsersStore';
import changeUsernameInput from '../../actions/changeUsernameInput';
import changePasswordInput from '../../actions/changePasswordInput';
import changeRepeatPasswordInput from '../../actions/changeRepeatPasswordInput';
import changeEmailInput from '../../actions/changeEmailInput';
import deleteUsernameInput from '../../actions/deleteUsernameInput';
import deletePasswordInput from '../../actions/deletePasswordInput';
import deleteRepeatPasswordInput from '../../actions/deleteRepeatPasswordInput';
import deleteEmailInput from '../../actions/deleteEmailInput';
import validateRegister from '../../helpers/validateRegister';
import {auth} from '../../../utils/auth';
import {assignRole} from '../../../utils/roles';


class Register extends PureComponent {
    constructor(props) {
        super(props);

        this.state = ({showPasswordEvent: false, showRepeatPassword: false});

        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeRepeatPassword = this.changeRepeatPassword.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.deleteUsername = this.deleteUsername.bind(this);
        this.deleteEmail = this.deleteEmail.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.showRepeatPassword = this.showRepeatPassword.bind(this);
        this.onEnterPres = this.onEnterPres.bind(this);
        this.sendInfo = this.sendInfo.bind(this);

    }

    componentWillUnmount() {
        const {
            deletePasswordInput,
            deleteUsernameInput,
            deleteEmailInput,
            deleteRepeatPasswordInput
        } = this.props;

        deletePasswordInput();
        deleteUsernameInput();
        deleteRepeatPasswordInput();
        deleteEmailInput();
    }

    changeUsername(event) {
        const username = event.target.value;
        const {changeUsernameInput} = this.props;

        changeUsernameInput(username);
    }

    changeEmail(event) {
        const email = event.target.value;
        const {changeEmailInput} = this.props;

        changeEmailInput(email);
    }

    deleteUsername() {
        const {deleteUsernameInput} = this.props;
        deleteUsernameInput();
    }

    deleteEmail() {
        const {deleteEmailInput} = this.props;
        deleteEmailInput();
    }

    changePassword(event) {
        const password = event.target.value;
        const {changePasswordInput} = this.props;

        changePasswordInput(password);
    }

    changeRepeatPassword(event) {
        const repeatPassword = event.target.value;
        const {changeRepeatPasswordInput} = this.props;

        changeRepeatPasswordInput(repeatPassword);
    }

    async sendInfo() {
        const {
            usernameInput,
            passwordInput,
            repeatPasswordInput,
            emailInput,
            deletePasswordInput,
            deleteUsernameInput,
            deleteEmailInput,
            deleteRepeatPasswordInput,
            initUserStore,
            history
        } = this.props;

        const validateReg = validateRegister(usernameInput, passwordInput, repeatPasswordInput, emailInput);
        if (validateReg === 'success') {
            auth.register(usernameInput, passwordInput, emailInput).then(userInfo => {
                auth.saveSession(userInfo);
                assignRole.makeRegularUser(userInfo._id).then(role =>{
                    let roleId = role.roleId;
                    sessionStorage.setItem('roleId', roleId);
                });

                initUserStore(userInfo.username);
                deletePasswordInput();
                deleteUsernameInput();
                deleteRepeatPasswordInput();
                deleteEmailInput();

                history.push('/');

                NotificationManager.success('Successfully registered');
            }).catch(err => {
                if (err.status === 409) {
                    NotificationManager.error('Username already exists');
                } else if (err.status === 400) {
                    NotificationManager.error('Email already exists');
                }
            });
        } else {
            NotificationManager.error(validateReg);
        }
    }

    showPassword() {
        this.setState({showPasswordEvent: !this.state.showPasswordEvent});
    }

    showRepeatPassword() {
        this.setState({showRepeatPassword: !this.state.showRepeatPassword});
    }

    onEnterPres(event) {
        if (event.keyCode === 13) { // enter
            this.sendInfo();
        }
    }

    render() {
        const {usernameInput, passwordInput, repeatPasswordInput, emailInput} = this.props;
        return (
            <div className="form-register">
                <div className="register" onKeyUp={this.onEnterPres}>
                    <p className="register-title">Register</p>
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
                        value={emailInput}
                        onChange={this.changeEmail}
                        label='Email' type='text'
                        name="email"
                        placeholder='e.g jsmith@example.com'
                        nameClass="input"
                        iconClass="icon-cross"
                        onClick={this.deleteEmail}
                        id="emailInput"
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
                    <Input
                        value={repeatPasswordInput}
                        onChange={this.changeRepeatPassword}
                        label='Repeat Password'
                        type={this.state.showRepeatPassword ? 'text' : 'password'}
                        name='repeatPassword'
                        nameClass="input"
                        iconClass="icon-eye"
                        onMouseDown={this.showRepeatPassword}
                        onMouseUp={this.showRepeatPassword}
                        id="repeatPasswordInput"
                    />
                    <p className="password-requirements">Password must be with at least one upper case letter, one number and one special charaacter</p>
                    <div className="register-buttons">
                        <Button
                            onClick={this.sendInfo}
                            label="Register"
                            nameClass="register-btn"
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(
    state => ({
        usernameInput: state.Register.get('usernameInput'),
        passwordInput: state.Register.get('passwordInput'),
        repeatPasswordInput: state.Register.get('repeatPasswordInput'),
        emailInput: state.Register.get('emailInput'),
    }),
    {
        initUserStore,
        changeUsernameInput,
        changePasswordInput,
        changeRepeatPasswordInput,
        changeEmailInput,
        deleteUsernameInput,
        deletePasswordInput,
        deleteRepeatPasswordInput,
        deleteEmailInput
    }
)(Register);

Register.propTypes = {
    initUserStore: PropTypes.func,
    changeUsernameInput: PropTypes.func,
    changePasswordInput: PropTypes.func,
    changeRepeatPasswordInput: PropTypes.func,
    changeEmailInput: PropTypes.func,
    deleteUsernameInput: PropTypes.func,
    deletePasswordInput: PropTypes.func,
    deleteRepeatPasswordInput: PropTypes.func,
    deleteEmailInput: PropTypes.func,
    usernameInput: PropTypes.string,
    passwordInput: PropTypes.string,
    repeatPasswordInput: PropTypes.string,
    emailInput: PropTypes.string,
    history: PropTypes.object
};