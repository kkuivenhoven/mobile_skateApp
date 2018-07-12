import React, { Component } from 'react';
import { connect } from 'react-redux';
import { skateSpotUpdate, skateSpotCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';
import Geocoder from 'react-native-geocoding';

class EmployeeCreate extends Component {
	onButtonPress(){
		//const { name, phone, shift } = this.props;
		const { name, addr_num, street, city, zip, ab_state, country, lat, lng } = this.props;

		  var addr = addr_num + street + ", " + city + ", " + ab_state + ", " + zip;
			var geo_lat, geo_lng;
			Geocoder.from(addr).then(json => {
					geo_lat = json.results[0].geometry.location.lat;
					geo_lng = json.results[0].geometry.location.lng;  
					this.props.skateSpotCreate({ name, addr_num, street, city, zip, ab_state: ab_state || 'CA', country, lat: geo_lat, lng: geo_lng });
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
	const { name, addr_num, street, city, zip, ab_state, country, lat, lng } = state.employeeForm;

	//return { name, phone, shift };
	return { name, addr_num, street, city, zip, ab_state, country, lat, lng };
};


export default connect(mapStateToProps, {
	skateSpotUpdate, skateSpotCreate
})(EmployeeCreate);


