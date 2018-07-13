import {SET_BEER_TYPE} from "../../constants/action-types";


export default (beerType) => ({type: SET_BEER_TYPE, payload: { beerType }});