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

		if(expanded){
			return (
				<CardSection>
					<Text>
						{"	"} {employee.addr_num} {employee.street} {"\n"}
						{"	"} {employee.city}, {employee.ab_state} {employee.zip} {employee.country} {"\n"}
						{"	"} {employee.lat}, {employee.lng}
					</Text>
				</CardSection>
			);
		}
	}

	render(){
		const { uid, name, zip } = this.props.employee;

			return (
				<TouchableWithoutFeedback 
					onPress={() => this.props.selectLibrary(uid)} 
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
	const expanded = state.employeeForm[0] === ownProps.employee.uid;

	return { expanded };
};


export default connect(mapStateToProps, actions)(ListItem);
