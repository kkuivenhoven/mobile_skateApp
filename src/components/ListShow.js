/* Resources:
	• https://stackoverflow.com/questions/34625829/change-button-style-on-press-in-react-native
*/
import React, { Component } from 'react';
import { LayoutAnimation, Text, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection } from './common';
import DoubleClick from 'react-native-double-click';
import { connect } from 'react-redux';
import * as actions from '../actions';
import EmployeeForm from './EmployeeForm';
import MapView, { Marker, Polyline, Polygon, Overlay, Circle } from 'react-native-maps';
import GeoFencing from 'react-native-geo-fencing';


class ListShow extends Component {

	// with only point and polygon
	componentDidMount() {
		const polygon = [
			{ lat: this.props.employee[1].NE_lat, lng: this.props.employee[1].NE_lng },
			{ lat: this.props.employee[1].SW_lat, lng: this.props.employee[1].NE_lng },
			{ lat: this.props.employee[1].SW_lat, lng: this.props.employee[1].SW_lng },
			{ lat: this.props.employee[1].NE_lat, lng: this.props.employee[1].SW_lng },
			{ lat: this.props.employee[1].NE_lat, lng: this.props.employee[1].NE_lng },
		];
	 
		const point = {
			lat: this.props.employee[1].lat,
			lng: this.props.employee[1].lng,
		};
	 
		GeoFencing.containsLocation(point, polygon)
			.then(() => console.log('point is within polygon'))
			.catch(() => console.log('point is NOT within polygon'))
	}

	/*_getCoords(){
		var latLng = [];
		latLng.push({latitude: this.props.employee[1].NE_lat, longitude: this.props.employee[1].NE_lng});
		latLng.push({latitude: this.props.employee[1].SW_lat, longitude: this.props.employee[1].SW_lng});
		latLng.push({latitude: this.props.employee[1].NE_lat, longitude: this.props.employee[1].SW_lng});
		latLng.push({latitude: this.props.employee[1].SW_lat, longitude: this.props.employee[1].NE_lng});
		return latLng;
	}*/

	getRadius(){
		var diff;
		diff = ((this.props.employee[1].NE_lat)-(this.props.employee[1].SW_lat));
		console.log("DIFF: " + diff);
		return diff;
	}
	

	render(){
		//const { uid, name, zip, expanded } = this.props.employee;
		//const { titleStyle, first, second } = styles;
		console.log("ListShow.js: ");
		console.log(this.props);
		console.log(this.state);
		const employee = this.props.employee;
		console.log("employee[1]: " + employee[1]);


			return (

        <View>
					<View>
						<Text>
							{"  "} {employee[1].addr_num} {employee[1].street} {"\n"}
							{"  "} {employee[1].city}, {employee[1].ab_state} {employee[1].zip} {employee[1].country} {"\n"}
							{"  "} {employee[1].NE_lat} -- {employee[1].NE_lng} {"\n"}
							{"  "} {employee[1].SW_lat} -- {employee[1].SW_lng} {"\n"}
						</Text>
					</View>
					<View>
						<MapView
							style={ styles.map }
							zoomEnabled={true}
							showsUserLocation={true}
							initialRegion={{
								latitude: employee[1].lat,
								longitude: employee[1].lng,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421,
							}}
						>
							<Polygon
								coordinates={[
									{ latitude: employee[1].NE_lat, longitude: employee[1].NE_lng },
									{ latitude: employee[1].SW_lat, longitude: employee[1].NE_lng },
									{ latitude: employee[1].SW_lat, longitude: employee[1].SW_lng },
									{ latitude: employee[1].NE_lat, longitude: employee[1].SW_lng },
									{ latitude: employee[1].NE_lat, longitude: employee[1].NE_lng },
								]}
								fillColor='rgba(44,168,255,.50)'
							/>
							<Marker
								coordinate={{latitude: employee[1].lat, longitude: employee[1].lng}}
							/>
						</MapView>
					</View>
        </View>

			);
	}
}

const dim = Dimensions.get('screen');

const styles = {
	first: {
	  //backgroundColor: '#a5e5a0',
		height: 300,
		flex: 1,
	},
	second: {
    //backgroundColor: '#8cedff',
	},
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
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



const mapStateToProps = (state) => {
	console.log("ListShow.js mapStateToProps(): ");
	console.log("Object.keys(state): " + Object.keys(state));
	console.log("Object.keys(state.employeeForm): " + Object.keys(state.employeeForm));
	console.log("Object.values(state.employeeForm): " + Object.values(state.employeeForm));
	console.log("Object.values(state.employeeForm[0]: " + Object.values(state.employeeForm[0]));
	console.log("Object.keys(state.employeeForm[1]: " + Object.keys(state.employeeForm[1]));
	console.log("Object.values(state.employeeForm[1]: " + Object.values(state.employeeForm[1]));
  //const { name, addr_num, street, city, zip, ab_state, country, NE_lat, SW_lat } = state.employeeForm;
  //return { name, addr_num, street, city, zip, ab_state, country, NE_lat, SW_lat };
  //const { employee } = state.employeeForm;
	const employee = state.employeeForm;
  return { employee };
};



export default connect(mapStateToProps, actions)(ListShow);
