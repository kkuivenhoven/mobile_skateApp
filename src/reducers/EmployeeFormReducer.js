import {
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	EMPLOYEE_SAVE_SUCCESS,
	SELECT_LIBRARY,
	//GET_LAT_LONG
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
	SW_lat: ''
};

export default (state = INITIAL_STATE, action) => {
	//console.log("+++...>>> EmployeeFormReducer.js");
	console.log(action);
	switch(action.type){
		case EMPLOYEE_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case EMPLOYEE_CREATE:
			return INITIAL_STATE;
		case SELECT_LIBRARY:
			/*console.log("+.> in SELECT_LIBRARY !!! ----+++++");
			console.log("Object.getOwnPropertyNames(state): " + Object.getOwnPropertyNames(state));
			console.log("state.employees: " + state.employees);
			console.log("INITIAL_STATE: " + INITIAL_STATE);
			console.log("Object.getOwnPropertyNames(INITIAL_STATE): " + Object.getOwnPropertyNames(INITIAL_STATE));
			console.log("state.name: " + state.name);
			console.log("+.> state: " + state);
			console.log("+.> action.payload: " + action.payload);
			console.log("+.> action.payload.name: " + action.payload.name);
			console.log("+.> action.payload.zip: " + action.payload.zip);*/
			return action.payload;
		//case GET_LAT_LONG:
	//		return action.payload;
		case EMPLOYEE_SAVE_SUCCESS:
			return INITIAL_STATE;
		default: 
			return state;
	}
};
