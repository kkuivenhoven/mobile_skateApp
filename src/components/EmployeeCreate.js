import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
	onButtonPress(){
		//const { name, phone, shift } = this.props;
		const { name, zip, ab_state } = this.props;
		//this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
		this.props.employeeCreate({ name, zip, ab_state: ab_state || 'CA' });
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
	const { name, zip, ab_state } = state.employeeForm;

	//return { name, phone, shift };
	return { name, zip, ab_state };
};


export default connect(mapStateToProps, {
	employeeUpdate, employeeCreate
})(EmployeeCreate);


