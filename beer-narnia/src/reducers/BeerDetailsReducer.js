import {Map} from 'immutable';
import {
    SET_BEER,
    SET_BEER_ID,
    SET_BEER_PRICE,
    SET_BEER_IMG,
    SET_BEER_TYPE,
    SET_BEER_DESCRIPTION,
    SET_BEER_COUNTRY,
    SET_BEER_NAME
} from '../constants/action-types';


const beerId = sessionStorage.getItem('beerId') !== null ? sessionStorage.getItem('beerId') : '';
const initialState = Map({
    beer: '',
    beerId: beerId,
    beerName: '',
    beerDescription: '',
    beerImg: '',
    beerCountry: '',
    beerPrice: '',
    beerType: '',
});

export default (state = initialState, {type, payload}) => { // action = { type, payload }
    switch (type) {
        case SET_BEER:
            return state.set('beer', payload.beer);
        case SET_BEER_ID:
            return state.set('beerId', payload.beerId);
        case SET_BEER_NAME:
            return state.set('beerName', payload.beerName);
        case SET_BEER_DESCRIPTION:
            return state.set('beerDescription', payload.beerDescription);
        case SET_BEER_IMG:
            return state.set('beerImg', payload.beerImg);
        case SET_BEER_COUNTRY:
            return state.set('beerCountry', payload.beerCountry);
        case SET_BEER_PRICE:
            return state.set('beerPrice', payload.beerPrice);
        case SET_BEER_TYPE:
            return state.set('beerType', payload.beerType);
        default:
            return state;
    }
};