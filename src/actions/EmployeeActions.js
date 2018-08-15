import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	NEW_SKATESPOT_GPS_CREATE,
	SKATESPOT_GPS_CREATE,
	EMPLOYEES_FETCH_SUCCESS,
	EMPLOYEE_SAVE_SUCCESS,
	LOGOUT_USER,
	SELECT_LIBRARY,
	EMPLOYEE_TIME,
	UPDATE_CI_USERS,
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

export const updateCIusers = (libraryId) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/skate_spots/${libraryId}`)
			.update({"checkedIn_users": currentUser.uid})
			.then(() => {
				dispatch({ type: UPDATE_CI_USERS });
				Actions.main({ type: 'reset' });
			});
	};
};


export const selectLibrary = (libraryId) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		//firebase.database().ref(`/users/${currentUser.uid}/employees/${libraryId}`)
		firebase.database().ref(`/users/${currentUser.uid}/skate_spots/${libraryId}`)
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


export const skateSpotCreate = ({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		//firebase.database().ref(`/users/${currentUser.uid}/employees`)
		firebase.database().ref(`/users/${currentUser.uid}/skate_spots`)
			.push({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime })
			.then(() => {
				dispatch({ type: EMPLOYEE_CREATE });
				Actions.main({ type: 'reset' });
			});
	};
};


export const skateSpotsFetch = () => {
	const { currentUser } = firebase.auth();

		//firebase.database().ref(`/users/${currentUser.uid}/employees`)
		  //.once('value', snapshot => {
	return (dispatch) => {
		//firebase.database().ref(`/users/${currentUser.uid}/employees`)
		firebase.database().ref(`/users/${currentUser.uid}/skate_spots`)
		  .on('value', snapshot => {
				dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};


export const saveTime = ({ userTime, uid }) => {
	const { currentUser } = firebase.auth();
	
	return (dispatch) => {
		//firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
		firebase.database().ref(`/users/${currentUser.uid}/skate_spots/${uid}`)
			.update({ userTime })
			.then(() => {
				dispatch({ type: EMPLOYEE_TIME });
			});
	};
};



export const skateSpotSave = ({ name, addr_num, street, city, zip, ab_state, country, uid, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		//firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
		firebase.database().ref(`/users/${currentUser.uid}/skate_spots/${uid}`)
			.set({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime })
			.then(() => {
				dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
				Actions.main({ type: 'reset' });
			});
	};
};



export const skateSpotDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();

	return () => {
		//firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
		firebase.database().ref(`/users/${currentUser.uid}/skate_spots/${uid}`)
			.remove()
			.then(() => {
				Actions.main({ type: 'reset' });
			});
	};
};


export const skateSpotGPSCreate = ({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime }) => {
	const { currentUser } = firebase.auth();
	console.log(currentUser);
	console.log(name, addr_num, street, city, zip, ab_state, country, lat, lng);

	return (dispatch) => {
		//firebase.database().ref(`/users/${currentUser.uid}/employees`)
		firebase.database().ref(`/users/${currentUser.uid}/skate_spots`)
			.push({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime })
			.then(() => {
				dispatch({ type: SKATESPOT_GPS_CREATE });
				//Actions.main({ type: 'reset' });
				Actions.tabbar({ type: 'reset' });
			});
	};
};


export const newSkateSpotGPSCreate = ({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime, user_id, checkedIn_users }) => {
	const { currentUser } = firebase.auth();
	console.log(currentUser);
	console.log(name, addr_num, street, city, zip, ab_state, country, lat, lng);

	return (dispatch) => {
		firebase.database().ref(`/skate_spots`)
			.push({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime, user_id, checkedIn_users })
			.then(() => {
				//firebase.database().ref(`/users/${currentUser.uid}/employees`)
				firebase.database().ref(`/users/${currentUser.uid}/skate_spots`)
					.push({ name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime })
					.then(() => {
						dispatch({ type: NEW_SKATESPOT_GPS_CREATE });
						//Actions.main({ type: 'reset' });
						Actions.tabbar({ type: 'reset' });
					});
			});
	};
};
