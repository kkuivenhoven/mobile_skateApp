import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';
import Router from './Router';


class App extends Component {
	componentWillMount(){
			const config = {
			apiKey: "AIzaSyBo632mq4TqzMYOWFpWUcwdU1tTO0XR3X8",
			authDomain: "skatespots-3a8f0.firebaseapp.com",
			databaseURL: "https://skatespots-3a8f0.firebaseio.com",
			projectId: "skatespots-3a8f0",
			storageBucket: "skatespots-3a8f0.appspot.com",
			messagingSenderId: "233353418469"
		};
		firebase.initializeApp(config);
	}

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;	

