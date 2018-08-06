import {
	GET_SKATE_SPOT,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_SKATE_SPOT:
			return action.payload;
		default:
			return state;
	}
};
