import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import CartItemsList from '../CartItemsList/CartItemsList.jsx';

class Cart extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {cartItems} = this.props;
        return (
            <div className={cartItems < 2 ? 'cart-with-less-beers' : 'cart'}>
                <CartItemsList/>
            </div>
        );
    }
}

export default connect(
    state => ({
        cartItems: state.Cart.get('cartItems')
    })
)(Cart);


Cart.propTypes = {
    cartItems: PropTypes.number
};

