import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class BeerBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = ({beerCount: 1});

        this.changeBeerCount = this.changeBeerCount.bind(this);
        this.addInCart = this.addInCart.bind(this);
    }

    changeBeerCount(event) {
        const count = event.target.value;
        if (isNaN(count)) {
            return;
        }
        this.setState({beerCount: count});
        sessionStorage.setItem('beerCount', count);
    }

    addInCart() {
        console.log(this.state.beerCount);
    }

    render() {
        const {beerCount} = this.state;
        const {name, description, price, image, id, onBlur} = this.props;
        return (
            <li className="beer-box" id={id}>
                <img src={image} alt={name}/>
                <label>{name}</label>
                <p>{description}</p>
                <label className="beer-box-price">{price}&euro;</label>
                <div className="beer-box-buttons">
                    <input
                        className="beer-box-count"
                        value={beerCount}
                        onChange={this.changeBeerCount}
                        onBlur={onBlur}
                        onClick={this.changeBeerCount}
                    />
                    <button onClick={this.addInCart}>+</button>
                    <button onClick={this.addInCart}>-</button>
                </div>
                <button onClick={this.addInCart}>Add in cart</button>
            </li>
        );
    }
}

export default BeerBox;

BeerBox.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    id: PropTypes.number,
    onBlur: PropTypes.func
};

