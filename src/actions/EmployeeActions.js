import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	EMPLOYEES_FETCH_SUCCESS,
	EMPLOYEE_SAVE_SUCCESS
} from './types';


export const employeeUpdate = ({ prop, value }) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop, value }
	};
};



//export const employeeCreate = ({ name, phone, shift }) => {
export const employeeCreate = ({ name, zip, ab_state }) => {
	const { currentUser } = firebase.auth();
	console.log(currentUser);
	//console.log(name, phone, shift);
	console.log(name, zip, ab_state);
			//.push({ name, phone, shift })

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.push({ name, zip, ab_state })
			.then(() => {
				dispatch({ type: EMPLOYEE_CREATE });
				Actions.main({ type: 'reset' });
			});
	};
};


export const employeesFetch = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees`)
			.on('value', snapshot => {
				dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
			});
	};
};


//export const employeeSave = ({ name, phone, shift, uid }) => {
export const employeeSave = ({ name, zip, ab_state, uid }) => {
	const { currentUser } = firebase.auth();

			//.set({ name, phone, shift })
	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.set({ name, zip, ab_state })
			.then(() => {
				dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
				Actions.main({ type: 'reset' });
			});
	};
};



export const employeeDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();

	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
			.remove()
			.then(() => {
				Actions.main({ type: 'reset' });
			});
	};
};



