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
		console.log("rD()-> expanded: " + expanded);
		console.log("rD()-> employee: " + employee);
		 
		if(expanded){
			console.log("inside if expanded");
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

			return (
				<TouchableWithoutFeedback 
					onPressIn={() => this.props.selectLibrary(uid)} 
					onLongPress={this.onRowPress.bind(this)}
				>
					<View>
						<CardSection>
							<Text style={styles.titleStyle}>
									{name}
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
	//const expanded = state.employee === ownProps.employee.uid;
	const expanded = state.employees === ownProps.employee.uid;
	console.log("expanded: " + expanded);
	console.log("ownProps.employee.uid: " + ownProps.employee.uid);
	console.log("state.employees: " + state.employees);
	console.log("state.employees.constructor.name: " + state.employees.constructor.name);

	return { expanded };
};


export default connect(mapStateToProps, actions)(ListItem);
