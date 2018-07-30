import {
	EMPLOYEES_FETCH_SUCCESS,
	//RETRIEVE_SKATE_SPOTS,
	//SELECT_LIBRARY
} from '../actions/types';


const INITIAL_STATE = {};


export default (state = INITIAL_STATE, action) => {
	console.log("inside EmployeeReducer.js");
	console.log("action: " + action);
	console.log("action.type: " + action.type);
	switch(action.type){
		//case SELECT_LIBRARY:
			//	return action.payload;
			//console.log("inside select_lib case");
			//console.log("action.payload: " + action.payload);
			//console.log("action.payload.ab_state: " + action.payload.ab_state);
			//console.log("state: " + state);
			//return action.payload;
		/*case RETRIEVE_SKATE_SPOTS:
			console.log("RETRIEVE_SKATE_SPOTS");
			console.log("Object.keys(action.payload): " + Object.keys(action.payload));
			console.log("Object.values(action.payload): " + Object.values(action.payload));
			console.log("action.payload: " + action.payload);
			return action.payload;*/
		case EMPLOYEES_FETCH_SUCCESS:
			return action.payload;
		default: 
			return state;
	}
};


	
