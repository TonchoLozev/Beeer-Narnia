import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, username, ...rest}) => {
    const isAuthorized = username !== '';
    return (
        <Route {...rest} render={props => (
            isAuthorized ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
            )
        )
        }/>
    );
};

export default connect(
    state => ({
        username: state.User.get('username'),
    })
)(PrivateRoute);

PrivateRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    username: PropTypes.string,
};