import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CardSection, Button } from './common';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { skateSpotsFetch, logoutUser } from '../actions';
import ListItem from './ListItem';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker } from 'react-native-maps';

class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
			markers: []
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
			<View style={{flex:1}}>
				<CardSection>
					<ListView
						enableEmptySections
						dataSource={this.dataSource}
						renderRow={this.renderRow}
					/>
				</CardSection>
				<View style={styles.bottomGrid}>
					<MapView
						style={ styles.map }
						region={{latitude: userCoords.latitude, longitude: userCoords.longitude }}
					>  
						{this._getCoords(this.props.employees).map(marker => (
							<Marker
								coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
							/>
						))}
							<Marker
								coordinate={ userCoords }
							/>
					</MapView>
				</View>
			</View>
		);
	}
}

const dim = Dimensions.get('screen');

const styles =  {
	bottomGrid: {
		position: 'absolute',
    left: 0,
    right: 0,
		bottom: 0,
    height: dim.height/2,
	},
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 240,
  },
};


const mapStateToProps = state => {
	const employees = _.map((state.employees), (val, uid) => {
		return { ...val, uid };
	});
	
	return { employees };
};



export default connect(mapStateToProps, { skateSpotsFetch, logoutUser })(EmployeeList);
