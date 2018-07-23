import React, { Component } from 'react';
import { connect } from 'react-redux';
import { skateSpotUpdate, skateSpotCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';
import Geocoder from 'react-native-geocoding';

class SkateSpotShow extends Component {
	render() {
		return (
			<Card>
        <Text>
          {"  "} {employee.addr_num} {employee.street} {"\n"}
          {"  "} {employee.city}, {employee.ab_state} {employee.zip} {employee.country} {"\n"}
          {"  "} {employee.NE_lat}, {employee.SW_lat}
        </Text>
			</Card>
		);
	}
}


const mapStateToProps = (state) => {
	const { name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lng } = state.employeeForm;

	return { expanded };
};


export default connect(mapStateToProps, {})(SkateSpotShow);
