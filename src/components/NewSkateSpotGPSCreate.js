import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newSkateSpotGPSCreate, skateSpotUpdate, skateSpotCreate } from '../actions';
import { Input, Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';
import Geocoder from 'react-native-geocoding';
import firebase from 'firebase';

class NewSkateSpotGPSCreate extends Component {
	constructor(props){
		super(props);

		this.state = {
			lat: null,
			lng: null,
			error: null,
		};

		this.getCoords();

	}


	onButtonPress(){
		//const { name, phone, shift } = this.props;
		//const { name, addr_num, street, city, zip, ab_state, country, lat, lng } = this.props;
		const { currentUser } = firebase.auth();
		console.log("Object.keys(this.props): " + Object.keys(this.props));
		console.log("Object.values(this.props): " + Object.values(this.props));
		console.log("currentUser: " + currentUser);
		console.log("Object.keys(currentUser): " + Object.keys(currentUser));
		console.log("Object.values(currentUser): " + Object.values(currentUser));
		const { name } = this.props;
		var g_num, g_street, g_city, g_zip, g_state, g_country, geo_NE_lat, geo_NE_lng, geo_SW_lat, geo_SW_lng;
		var user_ids = [];
		
		Geocoder.from({lat: this.state.lat, lng: this.state.lng})		
			.then(json => {
        var addressComponent = json.results[0].address_components[0];
				g_num = json.results[0].address_components[0].long_name;
				g_street = json.results[0].address_components[1].long_name;
				g_city = json.results[0].address_components[2].long_name;
				g_state = json.results[0].address_components[4].short_name;
				g_country = json.results[0].address_components[5].short_name;
				g_zip = json.results[0].address_components[6].long_name;
				geo_NE_lat = json.results[0].geometry.viewport.northeast.lat;
        geo_NE_lng = json.results[0].geometry.viewport.northeast.lng;
        geo_SW_lat = json.results[0].geometry.viewport.southwest.lat;
        geo_SW_lng = json.results[0].geometry.viewport.southwest.lng;	

				this.props.newSkateSpotGPSCreate({ name, addr_num: g_num, street: g_street, city: g_city, zip: g_zip, ab_state: g_state, country: g_country, lat: this.state.lat, lng: this.state.lng, NE_lat: geo_NE_lat, SW_lat: geo_SW_lat, NE_lng: geo_NE_lng, SW_lng: geo_SW_lng, userTime: 0, user_id: currentUser.uid, checkedIn_users: user_ids });
		})
		.catch(error => console.warn(error));
	}

	
	thenThis(){
		Geocoder.from({lat: this.state.lat, lng: this.state.lng})		
			.then(json => {
        		var addressComponent = json.results[0].address_components[0];
			console.log("geocoder addressComponent: " + addressComponent);
		})
		.catch(error => console.warn(error));
	}


	getCoords(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
        }, () => {
						console.log("this.state.lat: " + this.state.lat);
						console.log("this.state.lng: " + this.state.lng);
        }); 
      },  
      (error) => console.log("error: " + error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
	}	

	render() {
		return (
			<Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={value => this.props.skateSpotUpdate({ prop: 'name', value })} 
          />  
        </CardSection>
	
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
	newSkateSpotGPSCreate, skateSpotUpdate, skateSpotCreate
})(NewSkateSpotGPSCreate);


