import {
	EMPLOYEES_FETCH_SUCCESS,
	SELECT_LIBRARY
} from '../actions/types';


const INITIAL_STATE = {};


export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case SELECT_LIBRARY:
			return action.payload;
		case EMPLOYEES_FETCH_SUCCESS:
			return action.payload;
		default: 
			return state;
	}
};


	
