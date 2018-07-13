import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import CartItem from '../CartItem/CartItem.jsx';
import {connect} from "react-redux";

class CartItemsList extends PureComponent {
    constructor(props) {
        super(props);
        this.updateList = this.updateList.bind(this);
    }

    updateList() {
        this.forceUpdate();
    }

    render() {
        const {cart} = this.props;
        return (
            <div className="cart-items-list">
                <ul className="cart-items-ul">
                    {cart.map((beer, index) => <CartItem
                        key={beer._id}
                        index={index}
                        name={beer.name}
                        image={beer.img}
                        price={beer.price}
                        count={beer.count}
                        update={this.updateList}
                    />)}
                </ul>
            </div>
        );
    }
};

export default connect(
    state => ({
        cart: state.Cart.get('cart')
    })
)(CartItemsList);

CartItemsList.propTypes = {
    allBeers: PropTypes.array,
};