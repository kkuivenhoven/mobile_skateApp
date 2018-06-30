import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';


class EmployeeEdit extends Component {
	state = {showModal: false };

	componentWillMount() {
		_.each(this.props.employee, (value, prop) => {
			this.props.employeeUpdate({ prop, value });
		});
	}


	onButtonPress(){
		//const { name, phone, shift } = this.props;
		const { name, zip, ab_state } = this.props;
		//this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
		this.props.employeeSave({ name, zip, ab_state, uid: this.props.employee.uid });
	}


	onTextPress(){
		//const { phone, shift } = this.props;
		const { zip, ab_state } = this.props;
		//Communications.text(phone, `Your upcoming shift is on ${shift}`);
		Communications.text(zip, `Your upcoming ab_state is on ${ab_state}`);
	}


	onAccept(){
		const { uid } = this.props.employee;
		this.props.employeeDelete({ uid });
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
	const { name, zip, ab_state } = state.employeeForm;
	//return { name, phone, shift };
	return { name, zip, ab_state };
};


export default connect(mapStateToProps, {
	employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit);



