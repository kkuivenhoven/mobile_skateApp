import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
//import EmployeeForm from './EmployeeForm';
import SkateSpotForm from './SkateSpotForm';
import { updateSkateSpot, saveSkateSpot, skateSpotUpdate, skateSpotSave, skateSpotDelete, deleteSkateSpot } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import Geocoder from 'react-native-geocoding';

class SkateSpotEdit extends Component {
	state = {showModal: false };

	componentWillMount() {
		_.each(this.props.skate_spot, (value, prop) => {
			this.props.updateSkateSpot({ prop, value });
		});
	}


	onButtonPress(){
		//const { name, phone, shift } = this.props;
		//const { name, addr_num, street, city, zip, ab_state, country, lat, lng } = this.props;
		console.log("SKATE SPOT EDIT.JS");
		const { name, addr_num, street, city, zip, ab_state, country, lat, lng, NE_lat, SW_lat, NE_lng, SW_lng, userTime } = this.props;
		//this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
      var addr = addr_num + street + ", " + city + ", " + ab_state + ", " + zip;
      var geo_lat, geo_lng, geo_NE_lat, geo_SW_lat, geo_NE_lng, geo_SW_lng;
      Geocoder.from(addr).then(json => {
          geo_lat = json.results[0].geometry.location.lat;
          geo_lng = json.results[0].geometry.location.lng;
					geo_NE_lat = json.results[0].geometry.viewport.northeast.lat;
					geo_NE_lng = json.results[0].geometry.viewport.northeast.lng;
					geo_SW_lat = json.results[0].geometry.viewport.southwest.lat;
					geo_SW_lng = json.results[0].geometry.viewport.southwest.lng;
					//this.props.skateSpotSave({ name, addr_num, street, city, zip, ab_state, country, uid: this.props.employee.uid, lat: geo_lat, lng: geo_lng, NE_lat: geo_NE_lat, SW_lat: geo_SW_lat, NE_lng: geo_NE_lng, SW_lng: geo_SW_lng, userTime });
					this.props.saveSkateSpot({ name, addr_num, street, city, zip, ab_state, country, uid: this.props.skate_spot.uid, lat: geo_lat, lng: geo_lng, NE_lat: geo_NE_lat, SW_lat: geo_SW_lat, NE_lng: geo_NE_lng, SW_lng: geo_SW_lng, userTime });
			}).catch(error => console.warn(error));
	}


	onTextPress(){
		//const { phone, shift } = this.props;
		const { zip, ab_state } = this.props;
		//Communications.text(phone, `Your upcoming shift is on ${shift}`);
	}


	onAccept(){
		//const { uid } = this.props.employee;
		const { uid } = this.props.skate_spot;
		this.props.deleteSkateSpot({ uid });
	}

	onDecline(){
		this.setState({ showModal: false });
	}


	render(){
		return (
			<ScrollView>
			<Card>
				<SkateSpotForm />
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Save Changes
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
						Delete Spot
					</Button>
				</CardSection>
			
				<Confirm
					visible={this.state.showModal}
					onAccept={this.onAccept.bind(this)}
					onDecline={this.onDecline.bind(this)}
				>
					Are you sure you want to delete this?
				</Confirm>
			</Card>
			</ScrollView>
		);
	}
}


const mapStateToProps = (state) => {
	const { name, addr_num, street, city, zip, ab_state, country, NE_lat, SW_lat, userTime } = state.skateSpotsForm;

	return { name, addr_num, street, city, zip, ab_state, country, NE_lat, SW_lat, userTime };
};


export default connect(mapStateToProps, {
	updateSkateSpot, skateSpotUpdate, skateSpotSave, skateSpotDelete, deleteSkateSpot, saveSkateSpot,
})(SkateSpotEdit);
