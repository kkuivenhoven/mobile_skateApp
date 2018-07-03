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
					<Text style={{ flex: 1 }}>
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
	const expanded = state.employee === ownProps.employee.uid;

	return { expanded };
};


export default connect(mapStateToProps, actions)(ListItem);
