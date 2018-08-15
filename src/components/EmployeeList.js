import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CardSection, Button } from './common';
import { connect } from 'react-redux';
import { ScrollView, ListView } from 'react-native';
import { retrieveSkateSpots, skateSpotsFetch, logoutUser } from '../actions';
import ListItem from './ListItem';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'firebase';

class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      latitudeDelta: null,
      longitudeDelta: null,
      error: null,
    };
  }

	componentWillMount(){
		this.props.skateSpotsFetch();
		this.createDataSource(this.props);
		navigator.geolocation.watchPosition(
			(position) => {
					this.setState({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						longitudeDelta: position.coords.longitudeDelta,
						latitudeDelta: position.coords.latitudeDelta,
						error: null,
					});
			},
		);
	}

	componentWillReceiveProps(nextProps){
		this.createDataSource(nextProps);
	}

	createDataSource({ employees }){
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(employees);
	}

	_getUserCoords(){
		var userLatLng = [];
		navigator.geolocation.watchPosition(
			(position) => {
					this.setState({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						error: null,
					}, () => {
						userLatLng.push({latitude: this.state.latitude, longitude: this.state.longitude});
						return userLatLng;
					});
			},
		);
	}

	_getUserRegion(){
		var userRegion = [];
		navigator.geolocation.watchPosition(
			(position) => {
					this.setState({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						longitudeDelta: position.coords.longitudeDelta,
						latitudeDelta: position.coords.latitudeDelta,
						error: null,
					}, () => {
						userRegion.push({latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: this.state.latitudeDelta, longitudeDelta: this.state.longitudeDelta });
						return userRegion;
					});
			},
		);
	}

	_getCoords(employees){
		var latLng = [];
		for(var key in employees) {
			var obj = employees[key];
			for (var prop in obj) {
				if(prop == "name"){
					latLng.push({latitude: obj["lat"], longitude: obj["lng"]});
				}
			}
		}
		return latLng;
	}


	renderRow(employee){
		return <ListItem employee={employee} />;
	}


	render(){
		var userCoords = {
			latitude: JSON.stringify(this.state.latitude),
			longitude: JSON.stringify(this.state.longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
		};
		var coords = {
			latitude: JSON.stringify(this.state.latitude),
			longitude: JSON.stringify(this.state.longitude),
		};


		return (
				<ListView
					style={styles.topGrid}
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow}
				/>
		);
	}
}

const dim = Dimensions.get('screen');

const styles = {
	topGrid: {
		//position: 'absolute',
		borderRadius: 4,
		borderWidth: 5,
		borderColor: '#d6d7da',
    //height: dim.height/2,
	},
	bottomGrid: {
		position: 'absolute',
    left: 0,
    right: 0,
		bottom: 0,
    height: dim.height/2,
	},
  map: {
    position: 'absolute',
		borderRadius: 4,
		borderWidth: 5,
		borderColor: '#d6d7da',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: dim.height/2,
  },
};


const mapStateToProps = state => {
	const employees = _.map((state.employees), (val, uid) => {
		return { ...val, uid };
	});

	return { employees };
};



export default connect(mapStateToProps, {skateSpotsFetch, logoutUser })(EmployeeList);
