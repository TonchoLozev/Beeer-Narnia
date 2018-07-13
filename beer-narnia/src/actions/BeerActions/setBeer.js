import {SET_BEER} from "../../constants/action-types";


export default (beer) => ({type: SET_BEER, payload: { beer }});