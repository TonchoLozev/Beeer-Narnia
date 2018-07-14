import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

import Button from '../common/Button/Button.jsx';

import {assignRole} from "../../../utils/roles";
import {requestAccess} from "../../../utils/requestAccessService";

import setRequests from "../../actions/Requests/setRequests";

class Request extends PureComponent {
    constructor(props) {
        super(props);

        this.state = ({userId: '', requestId: '', username: ''});

        this.makeUserAdmin = this.makeUserAdmin.bind(this);
        this.removeRequest = this.removeRequest.bind(this);
    }

    componentDidMount() {
        const {request} = this.props;
        const {userId, _id, username} = request;

        this.setState({userId: userId, requestId: _id, username: username})
    }

    makeUserAdmin() {
        const {requests, setRequests, update} = this.props;
        const {userId, requestId, username} = this.state;

        assignRole.makeAdminUser(userId).then(res => {
            requestAccess.deleteRequest(requestId).then(response => {

                let arrRequests = requests;
                let index;

                requests.forEach((req, i) => {
                    if (req._id === requestId) {
                        index = i;
                    }
                });

                arrRequests.splice(index, 1);

                setRequests(arrRequests);

                NotificationManager.success(`Successfully given admin role to ${username}`);

                update();
            })
        }).catch(err => console.log(err))
    }

    removeRequest() {
        const {requests, setRequests, update} = this.props;
        const {requestId, username} = this.state;

        requestAccess.deleteRequest(requestId).then(response => {

            let arrRequests = requests;
            let index;

            requests.forEach((req, i) => {
                if (req._id === requestId) {
                    index = i;
                }
            });

            arrRequests.splice(index, 1);

            setRequests(arrRequests);

            NotificationManager.success(`Successfully removed ${username}'s request`);

            update();
        })
    }

    render() {
        const {request} = this.props;
        const {firstname, lastname, reason, username, userId} = request;
        return (
            <div className="request">
                <Button icon="icon-user-plus" onClick={this.makeUserAdmin}/>
                <Button icon="icon-user-minus" onClick={this.removeRequest}/>
                <span>{username}</span>
                <span>{firstname}</span>
                <span>{lastname}</span>
                <span className="reason-request">{reason}</span>
            </div>);
    }
}

export default connect(
    state => ({
        requests: state.Requests.get('requests')
    }),
    {
        setRequests
    }
)
(withRouter(Request));

Request.propTypes = {
    setRequests: PropTypes.func
};
