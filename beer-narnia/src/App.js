import './assets/styles/index.less';
import {withRouter} from 'react-router-dom';
import React, {PureComponent, Fragment} from 'react';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import PropTypes from 'prop-types';
import {NotificationContainer} from 'react-notifications';


class App extends PureComponent {
    constructor(props){
        super(props);

        this.changeLink = this.changeLink.bind(this);
    }
    changeLink(event){
        const link = event.target.getAttribute('link');
        const {history} = this.props;
        history.push(link);
    }
    render() {
        return (
            <Fragment>
                <NotificationContainer/>
                <Header onClick={this.changeLink}/>
                {this.props.children}
                <Footer/>
            </Fragment>
        );
    }
}

App.propTypes = {
    history: PropTypes.object,
    children: PropTypes.object
};

export default withRouter(App);
