import {
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	NEW_SKATESPOT_GPS_CREATE,
	SKATESPOT_GPS_CREATE,
	EMPLOYEE_SAVE_SUCCESS,
	SELECT_LIBRARY,
	EMPLOYEE_TIME,
	UPDATE_CI_USERS,
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
		case EMPLOYEE_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case NEW_SKATESPOT_GPS_CREATE:
			return INITIAL_STATE;
		case SKATESPOT_GPS_CREATE:
			return INITIAL_STATE;
		case EMPLOYEE_CREATE:
			return INITIAL_STATE;
		case SELECT_LIBRARY:
			return action.payload;
		case EMPLOYEE_TIME:
			return state;
		case UPDATE_CI_USERS:
			return action.payload;
		case EMPLOYEE_SAVE_SUCCESS:
			return INITIAL_STATE;
		default: 
			return state;
	}
};
