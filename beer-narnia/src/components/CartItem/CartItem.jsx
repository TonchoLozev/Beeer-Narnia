import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {connect} from "react-redux";

import updateCart from '../../actions/updateCart';
import updateCartItems from '../../actions/updateCartItems';


class CartItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = ({beerCount: 1, hovered: false, id: ''});

        this.changeBeerCount = this.changeBeerCount.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.hoverBox = this.hoverBox.bind(this);
        this.unHoverBox = this.unHoverBox.bind(this);
        this.plusOneCount = this.plusOneCount.bind(this);
        this.minusOneCount = this.minusOneCount.bind(this);
    }

    changeBeerCount(event) {
        const count = event.target.value;
        if (isNaN(count)) {
            return;
        }
        this.setState({beerCount: count});
    }

    removeFromCart(event) {
        const {cart, updateCart, updateCartItems, update} = this.props;
        let index = Number(event.target.getAttribute('index'));
        let arrCart = cart;

        arrCart.splice(index, 1);

        updateCart(arrCart);
        updateCartItems(arrCart.length);

        sessionStorage.setItem('cart', JSON.stringify(cart));
        update();
    }

    hoverBox() {
        this.setState({hovered: true});
    }

    unHoverBox() {
        this.setState({hovered: false});
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

    componentDidMount() {
        const {count, id} = this.props;
        this.setState({beerCount: count, id: id})
    }

    render() {
        const {beerCount} = this.state;
        const {name, price, image, id, index} = this.props;

        const hoverWholeBox = classnames({
            'cart-item': true,
            'hovered': this.state.hovered
        });
        const hoverInput = classnames({
            'beer-box-count': true,
            'hovered': this.state.hovered
        });
        return (
            <li
                className={hoverWholeBox}
                onMouseEnter={this.hoverBox}
                onMouseLeave={this.unHoverBox}
                id={id}
            >
                <div className="imgAndInfo">
                    <img src={image} alt={name}/>
                    <div className="infoBeer">
                        <label>Name: {name}</label>
                        <label className="beer-box-price">Price: {price}&euro;</label>
                        <div className="amount">
                            <label>Amount: </label>
                            <div className="beer-box-buttons">
                                <input
                                    className={hoverInput}
                                    value={beerCount}
                                    onChange={this.changeBeerCount}
                                />
                                <button onClick={this.plusOneCount}><i className="icon-plus"/></button>
                                <button onClick={this.minusOneCount}><i className="icon-minus"/></button>
                            </div>
                        </div>
                    </div>
                </div>
                <button index={index} className="add-button" onClick={this.removeFromCart}>Remove from cart</button>
            </li>
        );
    }
}

export default connect(
    state => ({
        cart: state.Cart.get('cart'),
        allBeers: state.Home.get('allBeers')
    }),
    {
        updateCart,
        updateCartItems
    }
)(CartItem);

CartItem.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    id: PropTypes.string,
    updateCart: PropTypes.func,
    allBeers: PropTypes.array,
    updateCartItems: PropTypes.func
};

