import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	EMPLOYEES_FETCH_SUCCESS,
	EMPLOYEE_SAVE_SUCCESS,
	LOGOUT_USER,
	SELECT_LIBRARY,
	//GET_LAT_LONG
} from './types';

/*export const getLatLong = () => {
	var latiLong = [];
	navigator.geolocation.watchPosition(
		(position) => {
				latiLong.push({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				}); 
		},  
	); 
	return (dispatch) => {
		dispatch({ 
			type: GET_LAT_LONG,
			payload: latiLong
		});
	};
}*/

export const selectLibrary = (libraryId) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees/${libraryId}`)
			.on('value', snapshot => {
				dispatch({ type: SELECT_LIBRARY, payload: [snapshot.key, snapshot.val()] });
			})
	};
};


export const skateSpotUpdate = ({ prop, value }) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop, value }
	};
};


export const skateSpotCreate = ({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat }) => {
	const { currentUser } = firebase.auth();
	console.log(currentUser);
	//console.log(name, phone, shift);
	console.log(name, addr_num, street, city, zip, ab_state, country, lat, lng);
			//.push({ name, phone, shift })

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.push({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat })
			.then(() => {
				dispatch({ type: EMPLOYEE_CREATE });
				Actions.main({ type: 'reset' });
			});
	};
};


export const skateSpotsFetch = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.on('value', snapshot => {
				dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};


export const skateSpotSave = ({ name, addr_num, street, city, zip, ab_state, country, uid, lat, lng, NE_lat, SW_lat }) => {
	const { currentUser } = firebase.auth();

			//.set({ name, phone, shift })
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.set({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat })
			.then(() => {
				dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
				Actions.main({ type: 'reset' });
			});
	};
};



export const skateSpotDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();

	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.remove()
			.then(() => {
				Actions.main({ type: 'reset' });
			});
	};
};


