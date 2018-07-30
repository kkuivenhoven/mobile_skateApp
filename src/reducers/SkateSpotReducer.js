import {
	//LOGIN_USER_SUCCESS,
	RETRIEVE_SKATE_SPOTS,
} from '../actions/types';

const INITIAL_STATE = {
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
};

export default (state = INITIAL_STATE, action) => {
	/*console.log("...........inside inside RETRIEVE SKATE SPOTS");
	console.log("......action.type: " + action.type);
	console.log("......Object.keys(action): " + Object.keys(action));
	console.log("......Object.values(action): " + Object.values(action));
	console.log("......Object.keys(state): " + Object.keys(state));
	console.log("......Object.values(state): " + Object.values(state));*/
	switch(action.type){
    //case LOGIN_USER_SUCCESS:
	//		console.log("alright try this");
	//		return action.payload;
		case RETRIEVE_SKATE_SPOTS:
			console.log("RETRIEVE SKATE SPOTS");
			return action.payload;
			//return INITIAL_STATE;
		default:
			return state;
	}
};
