import {SET_BEER_COUNTRY} from "../../constants/action-types";


export default (beerCountry) => ({type: SET_BEER_COUNTRY, payload: { beerCountry }});