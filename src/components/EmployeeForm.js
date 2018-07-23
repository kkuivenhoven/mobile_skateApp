import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { skateSpotUpdate, skateSpotCreate, logoutUser } from '../actions';
import { Card, CardSection, Button, Input, Zip } from './common';


class EmployeeForm extends Component {
	render(){
		return (
			<View>
				<CardSection>
					<Input
						label="Name"
						placeholder="Jane"
						value={this.props.name}
						onChangeText={value => this.props.skateSpotUpdate({ prop: 'name', value })}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="Address Num:"
						placeholder="282"
						value={this.props.addr_num}
						onChangeText={value => this.props.skateSpotUpdate({ prop: 'addr_num', value })}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="Street"
						placeholder="E 8th St"
						value={this.props.street}
						onChangeText={value => this.props.skateSpotUpdate({ prop: 'street', value })}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="City"
						placeholder="Chico"
						value={this.props.city}
						onChangeText={value => this.props.skateSpotUpdate({ prop: 'city', value })}
					/>
				</CardSection>

				<CardSection>
					<Zip
						label="Zip"
						placeholder="95928"
						value={this.props.zip}
						onChangeText={value => this.props.skateSpotUpdate({ prop: 'zip', value })}
					/>
				</CardSection>


				<CardSection>
					<Input
						label="State"
						placeholder="CA"
						value={this.props.ab_state}
						onChangeText={value => this.props.skateSpotUpdate({ prop: 'ab_state', value })}
					/>
				</CardSection>

				<CardSection>
					<Input
						label="Country"
						placeholder="USA"
						value={this.props.country}
						onChangeText={value => this.props.skateSpotUpdate({ prop: 'country', value })}
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
	const { name, addr_num, street, city, zip, ab_state, country } = state.employeeForm;

	return { name, addr_num, street, city, zip, ab_state, country };
};




export default connect(mapStateToProps, { skateSpotUpdate })(EmployeeForm);
