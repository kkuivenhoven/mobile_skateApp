import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { skateSpotUpdate, skateSpotSave, skateSpotDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import Geocoder from 'react-native-geocoding';

class EmployeeEdit extends Component {
	state = {showModal: false };

	componentWillMount() {
		_.each(this.props.employee, (value, prop) => {
			this.props.skateSpotUpdate({ prop, value });
		});
	}


	onButtonPress(){
		//const { name, phone, shift } = this.props;
		const { name, addr_num, street, city, zip, ab_state, country, lat, lng } = this.props;
		//this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
      var addr = addr_num + street + ", " + city + ", " + ab_state + ", " + zip;
      var geo_lat, geo_lng;
      Geocoder.from(addr).then(json => {
          geo_lat = json.results[0].geometry.location.lat;
          geo_lng = json.results[0].geometry.location.lng;
					this.props.skateSpotSave({ name, addr_num, street, city, zip, ab_state, country, uid: this.props.employee.uid, lat: geo_lat, lng: geo_lng });
			}).catch(error => console.warn(error));
	}


	onTextPress(){
		//const { phone, shift } = this.props;
		const { zip, ab_state } = this.props;
		//Communications.text(phone, `Your upcoming shift is on ${shift}`);
		Communications.text(zip, `Your upcoming ab_state is on ${ab_state}`);
	}


	onAccept(){
		const { uid } = this.props.employee;
		this.props.skateSpotDelete({ uid });
	}

	onDecline(){
		this.setState({ showModal: false });
	}


	render(){
		return (
			<Card>
				<EmployeeForm />
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Save Changes
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={this.onTextPress.bind(this)}>
						Text Schedule
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
						Fire Employee
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
		);
	}
}


const mapStateToProps = (state) => {
	//const { name, phone, shift } = state.employeeForm;
	const { name, addr_num, street, city, zip, ab_state, country } = state.employeeForm;
	//return { name, phone, shift };
	return { name, addr_num, street, city, zip, ab_state, country };
};


export default connect(mapStateToProps, {
	skateSpotUpdate, skateSpotSave, skateSpotDelete
})(EmployeeEdit);



