import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';

import {connect} from "react-redux";

import updateCart from '../../actions/updateCart';
import updateCartItems from '../../actions/updateCartItems';
import setBeerId from '../../actions/BeerActions/setBeerId';



class BeerBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = ({beerCount: 1, hovered: false});

        this.changeBeerCount = this.changeBeerCount.bind(this);
        this.addInCart = this.addInCart.bind(this);
        this.hoverBox = this.hoverBox.bind(this);
        this.unHoverBox = this.unHoverBox.bind(this);
        this.plusOneCount = this.plusOneCount.bind(this);
        this.minusOneCount = this.minusOneCount.bind(this);
        this.openBeerDetails = this.openBeerDetails.bind(this);
    }

    openBeerDetails(event){
        const {pageNum, allBeers, history, setBeerId, beerId} = this.props;

        const indexOfBeerToGet = Number(event.target.getAttribute('index'));
        const magicNumber = ((pageNum * 8) - 8) + indexOfBeerToGet;

        const beer = allBeers[magicNumber];

        setBeerId(beer._id);
        sessionStorage.setItem('beerId', beer._id);
        history.push('/beer');
    }

    changeBeerCount(event) {
        const count = event.target.value;
        if (isNaN(count)) {
            return;
        }
        this.setState({beerCount: count});
    }

    addInCart(event) {
        const {cart, updateCart, pageNum, allBeers, beersToShow, updateCartItems} = this.props;
        const {beerCount} = this.state;

        const indexOfBeerToGet = Number(event.target.getAttribute('index'));
        const magicNumber = ((pageNum * 8) - 8) + indexOfBeerToGet;

        const beer = allBeers[magicNumber];

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

    render() {
        const {beerCount} = this.state;
        const {name, description, price, image, id, index} = this.props;

        const hoverWholeBox = classnames({
            'beer-box': true,
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
                <img index={index} src={image} alt={name} onClick={this.openBeerDetails}/>
                <label>{name}</label>
                <p>{description}</p>
                <label className="beer-box-price">{price}&euro;</label>
                <div className="beer-box-buttons">
                    <input
                        className={hoverInput}
                        value={beerCount}
                        onChange={this.changeBeerCount}
                    />
                    <button onClick={this.plusOneCount}><i className="icon-plus"/></button>
                    <button onClick={this.minusOneCount}><i className="icon-minus"/></button>
                </div>
                <button index={index} className="add-button" onClick={this.addInCart}>Add in cart</button>
            </li>
        );
    }
}

export default connect(
    state => ({
        cart: state.Cart.get('cart'),
        allBeers: state.Home.get('allBeers'),
        beerId: state.Beer.get('beerId')
    }),
    {
        updateCart,
        updateCartItems,
        setBeerId
    }
)(withRouter(BeerBox));

BeerBox.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.number,
    updateCart: PropTypes.func,
    allBeers: PropTypes.array,
    updateCartItems: PropTypes.func,
    setBeerId: PropTypes.func
};

