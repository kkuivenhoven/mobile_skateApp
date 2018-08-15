import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	SIGNUP_USER,
	LOGOUT_USER,
	GET_GPS_LOC
} from '../actions/types';

const INITIAL_STATE = {
	email: '',
	password: '',
	user: null,
	error: '',
	loading: false,
};

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case GET_GPS_LOC:
			return action.payload;
		case LOGOUT_USER:
			return state;
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload };
		case LOGIN_USER: 
			return { ...state, loading: true, error: '' };
		case SIGNUP_USER: 
			return { ...state, loading: true, error: '' };
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case LOGIN_USER_FAIL:
			return { ...state, error: 'Auth failed.', password: '', loading: false };
		default: 
			return state;
	}
};	
