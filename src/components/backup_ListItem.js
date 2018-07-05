import React, { Component } from 'react';
import { LayoutAnimation, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from './common';
import DoubleClick from 'react-native-double-click';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ListItem extends Component {
	componentWillUpdate(){
		LayoutAnimation.spring();
	}
	
	onRowPress(){
		Actions.employeeEdit({ employee: this.props.employee });
	}

	renderDescription(){
		const { employee, expanded } = this.props;
		/*console.log("rD()-> expanded: " + expanded);
		console.log("rD()-> employee: " + employee);
		console.log("rD()-> employee.zip: " + employee.zip);
		console.log("rD()-> employee.uid: " + employee.uid);*/
		 
		if(expanded == false){
			console.log("rD()-> expanded is false");
			return;
		}
		else{
		//if(expanded != false){
			console.log("rD()-> inside if expanded");
			return (
				<CardSection>
					<Text>
						{employee.zip}
					</Text>
				</CardSection>
			);
		}
	}

	render(){
		const { uid, name, zip } = this.props.employee;
		console.log("K WE ARE HERE <<<<<>>>>>>>>");

			return (
				<TouchableWithoutFeedback 
					onPress={() => this.props.selectLibrary(uid)} 
					onLongPress={this.onRowPress.bind(this)}
				>
					<View>
						<CardSection>
							<Text style={styles.titleStyle}>
									{this.props.employee.name}, {this.props.employee.uid} 
							</Text>
						</CardSection>
						{this.renderDescription()}
					</View>
				</TouchableWithoutFeedback>
			);
	}
}


const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	}
};


const mapStateToProps = (state, ownProps) => {
	//const expanded = state.selectedLibraryId === ownProps.employee.id;
	//const expanded = state.employees === ownProps.employee.uid;
	//const val = (Object.keys(state.employees));

	//const expanded = state.employees === ownProps.employee.uid;
	const expanded = state.employeeForm.uid === ownProps.employee.uid;
	//const expanded = state.employee === ownProps.employee;
	console.log("))))))))))))))))))___________(((((((((((((((((");
	console.log("state.employees === ownProps.employee.uid: " + (state.employees === ownProps.employee.uid));
	console.log("(DBLE) state.employees == ownProps.employee.uid: " + (state.employees == ownProps.employee.uid));
	console.log("state.employees.class === ownProps.employee.uid.class: " + (state.employees.class === ownProps.employee.uid.class));
	console.log("state.employeeForm: " + state.employeeForm);
	console.log("state.employeeForm[0]: " + state.employeeForm[0]);
	console.log("Object.keys(state.employeeForm): " + Object.keys(state.employeeForm));
	console.log("state.employees.name: " + state.employees.name);
	console.log("state.employees.uid: " + state.employees.uid);
	console.log("....   state.employees: " + state.employees);
	console.log("expanded: " + expanded);
	console.log("ownProps.employee.uid: " + ownProps.employee.uid);
	/*console.log("state.employee: " + state.employee);
	console.log("state.contructor.name: " + state.constructor.name);
	console.log("state.type: " + state.type);
	console.log(">>>> state.zip: " + state.zip);*/
	console.log("--new__ Object.keys(state.employees): " + Object.getOwnPropertyNames(Object.keys(state.employees)));
	console.log("--new__ Object.values(state.employees): " + Object.getOwnPropertyNames(Object.values(state.employees)));
	console.log("++__ Object.keys(state).length: " + Object.keys(state).length);
	console.log("..........++__ Object.values(state.employees).length: " + Object.values(state.employees).length);
	console.log("++__ Object.getOwnPropertyNames(state): " + Object.getOwnPropertyNames(state));
	console.log("+**+__ Object.getOwnPropertyNames(state.employees): " + Object.getOwnPropertyNames(state.employees));
	console.log("+**+__ Object.getOwnPropertyNames(state.employeeForm): " + Object.getOwnPropertyNames(state.employeeForm));
	console.log("```_________++++________<<<<<_______+++_____``");
	console.log("--__ Object.keys(ownProps).length: " + Object.keys(ownProps).length);
	console.log("--__ Object.getOwnPropertyNames(ownProps): " + Object.getOwnPropertyNames(ownProps));
	console.log("--__ Object.getOwnPropertyNames(ownProps.employee): " + Object.getOwnPropertyNames(ownProps.employee));

	console.log("end -----");

	return { expanded };
};


export default connect(mapStateToProps, actions)(ListItem);
