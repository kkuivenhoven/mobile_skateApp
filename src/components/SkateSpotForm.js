import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { updateSkateSpot, skateSpotUpdate, skateSpotCreate, logoutUser } from '../actions';
import { Card, CardSection, Button, Input, Zip } from './common';


class SkateSpotForm extends Component {
	render(){
		//console.log("Object.keys(this.props): " + Object.keys(this.props));
		//console.log("Object.values(this.props): " + Object.values(this.props));

		return (
			<View>
				<CardSection>
					<Input
						label="Name"
						placeholder="California"
						value={this.props.name}
						onChangeText={value => this.props.updateSkateSpot({ prop: 'name', value })}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="Address Num:"
						placeholder="282"
						value={this.props.addr_num}
						onChangeText={value => this.props.updateSkateSpot({ prop: 'addr_num', value })}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="Street"
						placeholder="E 8th St"
						value={this.props.street}
						onChangeText={value => this.props.updateSkateSpot({ prop: 'street', value })}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="City"
						placeholder="Chico"
						value={this.props.city}
						onChangeText={value => this.props.updateSkateSpot({ prop: 'city', value })}
					/>
				</CardSection>

				<CardSection>
					<Zip
						label="Zip"
						placeholder="95928"
						value={this.props.zip}
						onChangeText={value => this.props.updateSkateSpot({ prop: 'zip', value })}
					/>
				</CardSection>


				<CardSection>
					<Input
						label="State"
						placeholder="CA"
						value={this.props.ab_state}
						onChangeText={value => this.props.updateSkateSpot({ prop: 'ab_state', value })}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="Country"
						placeholder="USA"
						value={this.props.country}
						onChangeText={value => this.props.updateSkateSpot({ prop: 'country', value })}
					/>
				</CardSection>

			</View>
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
//const mapStateToProps = (state, ownProps) => {
	console.log("SSF.js Object.keys(state): " + Object.keys(state));
	console.log("SSF.js Object.values(state): " + Object.values(state));
	console.log("SSF.js Object.keys(state.skateSpots): " + Object.keys(state.skateSpots));
	console.log("SSF.js Object.values(state.skateSpots): " + Object.values(state.skateSpots));
	console.log("SSF.js Object.keys(state.skateSpots): " + Object.keys(state.skateSpots));
	console.log("SSF.js Object.values(state.skateSpots): " + Object.values(state.skateSpots));
	//const { name, addr_num, street, city, zip, ab_state, country } = state.employeeForm;
	const { name, addr_num, street, city, zip, ab_state, country } = state.skateSpotsForm;

	return { name, addr_num, street, city, zip, ab_state, country };
};




export default connect(mapStateToProps, { skateSpotUpdate, updateSkateSpot })(SkateSpotForm);
