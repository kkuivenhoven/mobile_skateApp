import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	SIGNUP_USER,
	GET_GPS_LOC,
}	from './types';


export const getGPS = () => {
	var data = []; 
  navigator.geolocation.watchPosition(
    (position) => {
          data.push(position.coords.latitude);
          data.push(position.coords.longitude);
    },  
  );  

  console.log("data: " + data);
  console.log("Object.keys(data): " + Object.keys(data));
  console.log("Object.values(data): " + Object.values(data));
	
	return {
		type: GET_GPS_LOC,
		payload: data
	};
};


export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};


export const signupUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: SIGNUP_USER });
	
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(() => loginUserFail(dispatch));
		};
};


export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER });

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(() => loginUserFail(dispatch));
			/*.catch((error) => {
				console.log(error);
			
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(user => loginUserSuccess(dispatch, user))
					.catch(() => loginUserFail(dispatch));
				});*/
	};
};


const loginUserFail = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL });
};


const loginUserSuccess = (dispatch, user) => {
/*	const { currentUser } = firebase.auth();

	var lat;
	var lng;
  navigator.geolocation.watchPosition(
    (position) => {
          console.log("pos.crds.lat: " + position.coords.latitude);
          console.log("pos.crds.lng: " + position.coords.longitude);
					lat = position.coords.latitude;
					lng = position.coords.longitude;
    },  
  ); 

    firebase.database().ref(`/users/${currentUser.uid}/userDetails`)
      .push({lat, lng})
			.then(() => { 
				console.log("success here");
				dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
				Actions.tabbar();
			});*/

	//Actions.main();
	//Actions.navigation();
	dispatch({ 
		type: LOGIN_USER_SUCCESS, 
		payload: user 
	});
	Actions.tabbar();
};
