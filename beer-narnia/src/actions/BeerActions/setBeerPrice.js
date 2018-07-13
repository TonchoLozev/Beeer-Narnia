import {SET_BEER_PRICE} from "../../constants/action-types";


export default (beerPrice) => ({type: SET_BEER_PRICE, payload: { beerPrice }});