import React, { Component } from 'react';
import { connect } from 'react-redux';
import { skateSpotUpdate, skateSpotCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';
import Geocoder from 'react-native-geocoding';

class EmployeeCreate extends Component {
	onButtonPress(){
		//const { name, phone, shift } = this.props;
		//const { name, addr_num, street, city, zip, ab_state, country, lat, lng } = this.props;
		const { name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng } = this.props;

		  var addr = addr_num + street + ", " + city + ", " + ab_state + ", " + zip;
      //var geo_lat, geo_lng, geo_NE, geo_SW;
      var geo_lat, geo_lng, geo_NE_lat, geo_SW_lat, geo_NE_lng, geo_SW_lng, userTime;
			userTime = 0;
			Geocoder.from(addr).then(json => {
					geo_lat = json.results[0].geometry.location.lat;
					geo_lng = json.results[0].geometry.location.lng;  
					geo_NE_lat = json.results[0].geometry.viewport.northeast.lat;
					geo_NE_lng = json.results[0].geometry.viewport.northeast.lng;
					geo_SW_lat = json.results[0].geometry.viewport.southwest.lat;
					geo_SW_lng = json.results[0].geometry.viewport.southwest.lng;
					this.props.skateSpotCreate({ name, addr_num, street, city, zip, ab_state, country, lat: geo_lat, lng: geo_lng, NE_lat: geo_NE_lat, SW_lat: geo_SW_lat, NE_lng: geo_NE_lng, SW_lng: geo_SW_lng, userTime });
			}).catch(error => console.warn(error));
	}

	render() {
		return (
			<Card>
				<EmployeeForm { ...this.props} />
	
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Create
					</Button>
				</CardSection>
			</Card>
		);
	}
}


const styles = {
	pickerTextStyle: {
		fontSize: 18,
		paddingLeft: 20
	}
};


const mapStateToProps = (state) => {
	//const { name, phone, shift } = state.employeeForm;
	const { name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lng, userTime } = state.employeeForm;

	//return { name, phone, shift };
	return { name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lng, userTime };
};


export default connect(mapStateToProps, {
	skateSpotUpdate, skateSpotCreate
})(EmployeeCreate);


