import React from 'react';
import BeerBox from '../BeerBox/BeerBox.js';
import PropTypes from 'prop-types';

const BeerBoxList = ({beersToShow, pageNum}) => {
    return (
        <div className="beer-box-list">
            <ul className="beer-box-ul">
                {beersToShow.map((beer, index) => <BeerBox
                    key={index}
                    id={beer.id}
                    index={index}
                    name={beer.name}
                    image={beer.img}
                    description={beer.description}
                    price={beer.price}
                    pageNum={pageNum}
                    beersToShow={beersToShow}
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