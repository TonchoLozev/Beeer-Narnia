import {SET_BEER_DESCRIPTION} from "../../constants/action-types";


export default (beerDescription) => ({type: SET_BEER_DESCRIPTION, payload: { beerDescription }});