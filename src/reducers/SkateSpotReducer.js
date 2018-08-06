import {
	//LOGIN_USER_SUCCESS,
	RETRIEVE_SKATE_SPOTS,
	//GET_SKATE_SPOT,
	SKATE_SPOT_UPDATE,
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
	switch(action.type){
		case SKATE_SPOT_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case RETRIEVE_SKATE_SPOTS:
			return action.payload;
		default:
			return state;
	}
};
