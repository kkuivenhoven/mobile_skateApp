import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
	SKATE_SPOT_UPDATE,
	RETRIEVE_SKATE_SPOTS,
	GET_SKATE_SPOT,
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


