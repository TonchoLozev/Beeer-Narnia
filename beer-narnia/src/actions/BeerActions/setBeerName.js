import {SET_BEER_NAME} from "../../constants/action-types";


export default (beerName) => ({type: SET_BEER_NAME, payload: { beerName }});