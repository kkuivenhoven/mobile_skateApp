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
						onChangeText={value => this.props.skateSpotpdate({ prop: 'street', value })}
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


				<CardSection style={{ flexDirection: 'column' }}>
					<Text style={styles.pickerTextStyle}>State</Text>
					<Picker
						style={{ flex: 1 }}
						selectedValue={this.props.ab_state}
						onValueChange={value => this.props.skateSpotUpdate({ prop: 'ab_state', value })}
					>
						<Picker.Item label="AL" value="AL" />
						<Picker.Item label="AK" value="AK" />
						<Picker.Item label="AZ" value="AZ" />
						<Picker.Item label="AR" value="AR" />
						<Picker.Item label="CA" value="CA" />
						<Picker.Item label="CO" value="CO" />
						<Picker.Item label="CT" value="CT" />
						<Picker.Item label="DE" value="DE" />
						<Picker.Item label="FL" value="FL" />

						<Picker.Item label="GA" value="GA" />
						<Picker.Item label="HI" value="HI" />
						<Picker.Item label="ID" value="ID" />
						<Picker.Item label="IL" value="IL" />
						<Picker.Item label="IN" value="IN" />
						<Picker.Item label="IA" value="IA" />
						<Picker.Item label="KS" value="KS" />
						<Picker.Item label="KY" value="KY" />
						<Picker.Item label="LA" value="LA" />

						<Picker.Item label="ME" value="ME" />
						<Picker.Item label="MD" value="MD" />
						<Picker.Item label="MA" value="MA" />
						<Picker.Item label="MI" value="MI" />
						<Picker.Item label="MN" value="MN" />
						<Picker.Item label="MS" value="MS" />
						<Picker.Item label="MO" value="MO" />
						<Picker.Item label="MT" value="MT" />

						<Picker.Item label="NE" value="NE" />
						<Picker.Item label="NV" value="NV" />
						<Picker.Item label="NH" value="NH" />
						<Picker.Item label="NJ" value="NJ" />
						<Picker.Item label="NM" value="NM" />
						<Picker.Item label="NY" value="NY" />
						<Picker.Item label="NC" value="NC" />
						<Picker.Item label="ND" value="ND" />
						<Picker.Item label="OH" value="OH" />

						<Picker.Item label="OK" value="OK" />
						<Picker.Item label="OR" value="OR" />
						<Picker.Item label="PA" value="PA" />
						<Picker.Item label="PR" value="PR" />
						<Picker.Item label="RI" value="RI" />
						<Picker.Item label="SC" value="SC" />
						<Picker.Item label="SD" value="SD" />
						<Picker.Item label="TN" value="TN" />
						<Picker.Item label="UT" value="UT" />

						<Picker.Item label="VT" value="VT" />
						<Picker.Item label="VA" value="VA" />
						<Picker.Item label="VI" value="VI" />
						<Picker.Item label="WA" value="WA" />

						<Picker.Item label="WV" value="WV" />
						<Picker.Item label="WI" value="WI" />
						<Picker.Item label="WY" value="WY" />

					</Picker>
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
