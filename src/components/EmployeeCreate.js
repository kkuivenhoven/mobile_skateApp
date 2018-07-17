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
		const { name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat } = this.props;

		  var addr = addr_num + street + ", " + city + ", " + ab_state + ", " + zip;
      var geo_lat, geo_lng, geo_NE, geo_SW;
			Geocoder.from(addr).then(json => {
					geo_lat = json.results[0].geometry.location.lat;
					geo_lng = json.results[0].geometry.location.lng;  
					//console.log("bounds: " + json.results[0]);
					//geo_NE = Object.values(json.results[0].geometry.bounds.northeast);
					//geo_SW = json.results[0].geometry.bounds.southwest;
					this.props.skateSpotCreate({ name, addr_num, street, city, zip, ab_state, country, lat: geo_lat, lng: geo_lng, NE_lat: geo_lat, SW_lat: geo_lng });
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
	const { name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lng } = state.employeeForm;

	//return { name, phone, shift };
	return { name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lng };
};


export default connect(mapStateToProps, {
	skateSpotUpdate, skateSpotCreate
})(EmployeeCreate);


