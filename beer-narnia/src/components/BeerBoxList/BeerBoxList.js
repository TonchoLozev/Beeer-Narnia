import React from 'react';
import BeerBox from '../BeerBox/BeerBox.js';
import PropTypes from 'prop-types';

const BeerBoxList = ({allBeers, onBlur}) => {
    return (
        <div className="beer-box-list">
            <ul className="beer-box-ul">
                {allBeers.map((beer, index) => <BeerBox
                    key={index}
                    name={beer.name}
                    image={beer.img}
                    description={beer.description}
                    price={beer.price}
                    onBlur={onBlur}
                />)}
            </ul>
        </div>
    );
};

export default BeerBoxList;

BeerBoxList.propTypes = {
    allBeers: PropTypes.array,
    onBlur: PropTypes.func
};