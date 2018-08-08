import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
	SKATE_SPOT_UPDATE,
	RETRIEVE_SKATE_SPOTS,
	GET_SKATE_SPOT,
	SAVE_SKATE_SPOT_SUCCESS,
} from './types';

export const getSkateSpot = (skateSpotId) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
    firebase.database().ref(`/skate_spots/${skateSpotId}`)
      .on('value', snapshot => {
        dispatch({ type: GET_SKATE_SPOT, payload: [snapshot.key, snapshot.val()] }); 
      }) 
	};
};



export const retrieveSkateSpots = () => {
  const { currentUser } = firebase.auth();

	return (dispatch) => {
    firebase.database().ref(`/skate_spots`)
      .on('value', snapshot => {
				dispatch({ type: RETRIEVE_SKATE_SPOTS, payload: snapshot.val() });
			});
	};
};


export const updateSkateSpot = ({ prop, value }) => {
  return {
    type: SKATE_SPOT_UPDATE,
    payload: { prop, value }
  };  
};


export const deleteSkateSpot = ({ uid }) => {

  return () => {
    firebase.database().ref(`/skate_spots/${uid}`)
      .remove()
      .then(() => {
        //Actions.main({ type: 'reset' }); 
        //Actions.navigation({ type: 'reset' }); 
        Actions.tabbar({ type: 'reset' }); 
      }); 
  }; 
};


export const saveSkateSpot = ({ name, addr_num, street, city, zip, ab_state, country, uid, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/skate_spots/${uid}`)
			.set({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime })
			.then(() => {
				dispatch({ type: SAVE_SKATE_SPOT_SUCCESS });
				//Actions.main({ type: 'reset' });
				//Actions.navigation({ type: 'reset' });
				Actions.tabbar({ type: 'reset' });
			});
	};
};

