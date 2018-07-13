import {SET_BEER_ID} from "../../constants/action-types";


export default (beerId) => ({type: SET_BEER_ID, payload: { beerId }});