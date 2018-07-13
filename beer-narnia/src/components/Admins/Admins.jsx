import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Admins extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="admins-page">
                Admins
            </div>
        );
    }
}

export default Admins;


