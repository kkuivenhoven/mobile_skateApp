import {
	SKATE_SPOT_UPDATE,
	SAVE_SKATE_SPOT_SUCCESS,
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
    case SAVE_SKATE_SPOT_SUCCESS:
      return INITIAL_STATE;
		default:
			return state;
	}
};

