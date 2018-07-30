import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
	RETRIEVE_SKATE_SPOTS,
} from './types';


export const retrieveSkateSpots = () => {
  const { currentUser } = firebase.auth();
	/*console.log("inside retrieveSkateSpots()");
	console.log("RSS() ");
	console.log("currentUser.uid: " + currentUser.uid);*/
	/*var ss_list = firebase.database().ref('/skate_spots');
	console.log("firebase.database().ref('/skate_spots'): " + ss_list);
	console.log("Object.keys(ss_list): " + Object.keys(ss_list));	
	console.log("Object.values(ss_list): " + Object.values(ss_list));	*/
	//firebase.database().ref().off();
	//var refer = firebase.database().ref(`/skate_spots`);
	//console.log("Object.keys(refer): " + Object.keys(refer));	
	//console.log("Object.values(refer): " + Object.values(refer));	
	return (dispatch) => {
    firebase.database().ref(`/skate_spots`)
      .on('value', snapshot => {
				dispatch({ type: RETRIEVE_SKATE_SPOTS, payload: snapshot.val() });
			});
	};
};



