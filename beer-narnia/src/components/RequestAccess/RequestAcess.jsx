import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NotificationManager} from 'react-notifications';
import {withRouter} from 'react-router-dom';

import Input from '../common/Input/Input.jsx';
import TextArea from '../common/TextArea/TextArea.jsx';
import Button from '../common/Button/Button.jsx';

import setFirstName from '../../actions/RequestAccess/setFirstName';
import setLastName from '../../actions/RequestAccess/setLastName';
import setReason from '../../actions/RequestAccess/setReason';
import deleteFirstName from '../../actions/RequestAccess/deleteFirstName';
import deleteLastName from '../../actions/RequestAccess/deleteLastName';
import deleteReason from '../../actions/RequestAccess/deleteReason';

import validateRequestAccess from '../../helpers/validateRequestAccess';

import {requestAccess} from '../../../utils/requestAccessService';


class RequestAcess extends PureComponent {
    constructor(props) {
        super(props);

        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setReason = this.setReason.bind(this);
        this.deleteFirstName = this.deleteFirstName.bind(this);
        this.deleteLastName = this.deleteLastName.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.cancelRequest = this.cancelRequest.bind(this);
    }

    setFirstName(event) {
        const firstName = event.target.value;
        const {setFirstName} = this.props;

        setFirstName(firstName)
    }

    setLastName(event) {
        const lastName = event.target.value;
        const {setLastName} = this.props;

        setLastName(lastName);
    }

    setReason(event) {
        const reason = event.target.value;
        const {setReason} = this.props;

        setReason(reason);
    }

    deleteFirstName() {
        const {deleteFirstName} = this.props;

        deleteFirstName();
    }

    deleteLastName() {
        const {deleteLastName} = this.props;

        deleteLastName();
    }

    sendRequest() {
        const {firstName, lastName, reason, history, deleteFirstName, deleteLastName, deleteReason} = this.props;
        const validateReg = validateRequestAccess(firstName, lastName, reason);

        if (validateReg === 'success') {
            requestAccess.createRequestAccess(
                sessionStorage.getItem('userId'),
                sessionStorage.getItem('username'),
                firstName,
                lastName,
                reason).then(res => {

                deleteFirstName();
                deleteLastName();
                deleteReason();

                history.push('/');
                NotificationManager.success('Your request was sent successfully')
            }).catch(err => {
                if (err.status === 400) {
                    NotificationManager.error('There is a request from this account already');
                }
            })
        } else {
            NotificationManager.error(validateReg);
        }
    }

    cancelRequest() {
        const {history} = this.props;
        history.push('/');
    }

    render() {
        const {firstName, lastName, reason} = this.props;
        return (
            <div className="request-access">
                <div className="request-access-form">
                    <Input
                        value={firstName}
                        nameClass="input"
                        label="First name"
                        type="text"
                        iconClass="icon-cross"
                        onChange={this.setFirstName}
                        onClick={this.deleteFirstName}
                    />
                    <Input
                        value={lastName}
                        nameClass="input"
                        label="Last name"
                        type="text"
                        iconClass="icon-cross"
                        onChange={this.setLastName}
                        onClick={this.deleteLastName}
                    />
                    <TextArea
                        value={reason}
                        nameClass="text-area-reason"
                        label="Reason for access"
                        onChange={this.setReason}
                    />
                    <div className="request-access-buttons">
                        <Button nameClass="request-access-btn" label="Send request" onClick={this.sendRequest}/>
                        <Button nameClass="request-access-btn" label="Cancel" onClick={this.cancelRequest}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(
    state => ({
        firstName: state.RequestAccess.get('firstName'),
        lastName: state.RequestAccess.get('lastName'),
        reason: state.RequestAccess.get('reason')
    }),
    {
        setFirstName,
        setLastName,
        setReason,
        deleteFirstName,
        deleteLastName,
        deleteReason

    }
)
(withRouter(RequestAcess));

RequestAcess.propTypes = {
    setFirstName: PropTypes.func,
    setLastName: PropTypes.func,
    setReason: PropTypes.func,
    deleteFirstName: PropTypes.func,
    deleteLastName: PropTypes.func,
    deleteReason: PropTypes.func
};
