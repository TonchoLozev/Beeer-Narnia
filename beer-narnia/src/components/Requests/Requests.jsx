import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {requestAccess} from "../../../utils/requestAccessService";

import setRequests from '../../actions/Requests/setRequests';

import Button from '../common/Button/Button.jsx';
import Request from '../Request/Request.jsx';

class Requests extends PureComponent {
    constructor(props) {
        super(props);

        this.updateList = this.updateList.bind(this);
    }

    componentDidMount() {
        const {setRequests} = this.props;
        requestAccess.getAllRequests().then(res => {
            setRequests(res)
        }).catch(err => console.log(err));
    }

    updateList() {
        this.forceUpdate();
    }

    render() {
        const {requests} = this.props;
        const requestsLi = requests.map((req, index) => {
            return (
                <li className="requests-li" key={req._id}>
                    <Request update={this.updateList} request={req}/>
                </li>)
        });
        return (<div className="requests">
            <div className="requests-info">
                <Button icon="icon-user-plus"/>
                <Button icon="icon-user-minus"/>
                <span>Username</span>
                <span>First name</span>
                <span>Last name</span>
                <span>Reason</span>
            </div>
            {requests.length !== 0 ? <ul className="requests-ul">{requestsLi}</ul> : <div>No requests</div>}
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
(withRouter(Requests));

Requests.propTypes = {
    setRequests: PropTypes.func
};
