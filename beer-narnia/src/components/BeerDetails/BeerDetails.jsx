import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {connect} from "react-redux";
import setBeerName from "../../actions/BeerActions/setBeerName";
import setBeerType from "../../actions/BeerActions/setBeerType";
import setBeerImg from "../../actions/BeerActions/setBeerImg";
import setBeerPrice from "../../actions/BeerActions/setBeerPrice";
import setBeerCountry from "../../actions/BeerActions/setBeerCountry";
import setBeerDescription from "../../actions/BeerActions/setBeerDescription";
import updateCart from '../../actions/updateCart';
import updateCartItems from "../../actions/updateCartItems";



class BeerDetails extends PureComponent {
    constructor(props) {
        super(props);

        this.state = ({beerCount: 1});

        this.addInCart = this.addInCart.bind(this);
        this.plusOneCount = this.plusOneCount.bind(this);
        this.minusOneCount = this.minusOneCount.bind(this);
        this.changeBeerCount = this.changeBeerCount.bind(this);
    }

    addInCart(event) {
        const {cart, updateCart, beer, updateCartItems} = this.props;
        const {beerCount} = this.state;

        let arrCart = cart;

        let index = 0;
        let isFound = false;
        for (let i = 0; i < arrCart.length; i++) {
            if (arrCart[i]._id === beer._id) {
                index = i;
                isFound = true;
                break;
            }
        }

        if (isFound) {
            arrCart[index].count += Number(beerCount);
        }
        else {
            beer.count = Number(beerCount);
            arrCart.push(beer);
            updateCartItems(arrCart.length);
        }
        updateCart(arrCart);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    plusOneCount() {
        this.setState({beerCount: this.state.beerCount + 1});
    }

    minusOneCount() {
        if (this.state.beerCount === 1) {
            return;
        }
        this.setState({beerCount: this.state.beerCount - 1});
    }

    changeBeerCount(event) {
        const count = event.target.value;
        if (isNaN(count)) {
            return;
        }
        this.setState({beerCount: count});
    }

    render() {
        const {beerName, beerType, beerPrice, beerDescription, beerCountry, beerImg} = this.props;
        const {beerCount} = this.state;
        return (
            <div className="beer-details">
                <label>{beerName}</label>
                <img src={beerImg}/>
                <span>Country</span>
                <p>{beerCountry}</p>
                <span>Type</span>
                <p>{beerType}</p>
                <span>Description</span>
                <p>{beerDescription}</p>
                <span>Price</span>
                <p>{beerPrice}&euro;</p>
                <div className="beer-box-buttons">
                    <input
                        className='beer-box-count'
                        value={beerCount}
                        onChange={this.changeBeerCount}
                    />
                    <button onClick={this.plusOneCount}><i className="icon-plus"/></button>
                    <button onClick={this.minusOneCount}><i className="icon-minus"/></button>
                </div>
                <button className="add-button" onClick={this.addInCart}>Add in cart</button>
            </div>
        );
    }
}

export default connect(
    state => ({
        cart: state.Cart.get('cart'),
        beer: state.Beer.get('beer'),
        beerName: state.Beer.get('beerName'),
        beerType: state.Beer.get('beerType'),
        beerPrice: state.Beer.get('beerPrice'),
        beerDescription: state.Beer.get('beerDescription'),
        beerImg: state.Beer.get('beerImg'),
        beerCountry: state.Beer.get('beerCountry')
    }),
    {
        updateCart,
        updateCartItems
    }
)(BeerDetails);


BeerDetails.propTypes = {};



