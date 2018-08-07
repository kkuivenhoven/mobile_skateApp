import {
	//LOGIN_USER_SUCCESS,
	//GET_SKATE_SPOT,
	/*SKATE_SPOT_UPDATE,
	SAVE_SKATE_SPOT_SUCCESS,*/
	RETRIEVE_SKATE_SPOTS,
} from '../actions/types';

const INITIAL_STATE = {};
/*const INITIAL_STATE = {
	name: '',
	addr_num: '',
	street: '',
	city: '',
	zip: '',
	ab_state: '',
	country: '',
	uid: '',
	lat: '',
	lng: '',
	NE_lat: '',
	NE_lng: '',
	SW_lat: '',
	SW_lng: '',
	userTime: '',
	user_id: '',
	checkedIn_users: []
};*/

export default (state = INITIAL_STATE, action) => {
	console.log("inside SkateSpotReducer.js ");
	switch(action.type){
		/*case SKATE_SPOT_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
    case SAVE_SKATE_SPOT_SUCCESS:
      return INITIAL_STATE;*/
		case RETRIEVE_SKATE_SPOTS:
			return action.payload;
		default:
			return state;
	}
};
