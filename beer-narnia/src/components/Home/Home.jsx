import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import BeerBoxList from '../BeerBoxList/BeerBoxList.jsx';

import initHomeStore from '../../actions/initHomeStore';

import {beers} from '../../../utils/articlesService';
import {auth} from '../../../utils/auth';

class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            articlesPerPage: 8,
            articlesLessThanFive: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handlePageChange(pageOfItems) {
        this.setState({pageOfItems: pageOfItems});
    }

    componentDidMount() {
        const {initHomeStore,cart} = this.props;
        auth.login('guest', 'guest').then(res => {
            sessionStorage.setItem('authtoken', res._kmd.authtoken);
            sessionStorage.setItem('cart', JSON.stringify(cart));
            beers.getAllBeers().then(allBeers => initHomeStore(allBeers));
        });
    }

    render() {
        const {username, allBeers} = this.props;
        const {articlesPerPage, currentPage} = this.state;

        const indexOfLastTodo = currentPage * articlesPerPage;
        const indexOfFirstTodo = indexOfLastTodo - articlesPerPage;
        const beersToShow = allBeers.slice(indexOfFirstTodo, indexOfLastTodo);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allBeers.length / articlesPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    className="page-number"
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });
        return (
            <div className={beersToShow.length < 5 ? 'home-with-less-beers' : 'home'}>
                <div className="welcome">
                    {username !== '' ?
                        <p>Welcome, {username}!</p> : ''}
                </div>
                <BeerBoxList pageNum={currentPage} beersToShow={beersToShow}/>
                <ul className="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        username: state.User.get('username'),
        allBeers: state.Home.get('allBeers'),
        cart: state.Cart.get('cart')
    }),
    {
        initHomeStore
    }
)(Home);


Home.propTypes = {
    initHomeStore: PropTypes.func,
    clearBeerCount: PropTypes.func,
    username: PropTypes.string,
    allBeers: PropTypes.array
};

