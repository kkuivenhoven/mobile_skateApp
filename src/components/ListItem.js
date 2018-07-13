/* Resources:
	- https://stackoverflow.com/questions/34625829/change-button-style-on-press-in-react-native
*/
import React, { Component } from 'react';
import { LayoutAnimation, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection } from './common';
import DoubleClick from 'react-native-double-click';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MapView, { Marker } from 'react-native-maps';

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
				<View>
					<Text>
						{"	"} {employee.addr_num} {employee.street} {"\n"}
						{"	"} {employee.city}, {employee.ab_state} {employee.zip} {employee.country} {"\n"}
						{"	"} {employee.lat}, {employee.lng}
					</Text>
					<CardSection>
						<MapView
							style={ styles.map }
							initialRegion={{
								latitude: employee.lat,
								longitude: employee.lng,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421,
							}}
						>
							<Marker
								coordinate={{latitude: employee.lat, longitude: employee.lng}}
								title={employee.name}
							/>
						</MapView>
					</CardSection>
				</View>
			);
		}
	}

	render(){
		const { uid, name, zip, expanded } = this.props.employee;
		const { titleStyle, first, second } = styles;
		console.log(this.props);

			return (
				<TouchableWithoutFeedback 
					onPress={() => this.props.selectLibrary(uid)}
					onLongPress={this.onRowPress.bind(this)}
				>
					<View style={ this.props.expanded ? first : second }>
						<CardSection>
							<Text style={titleStyle}>
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
	first: {
	  //backgroundColor: '#a5e5a0',
		height: 300,
		flex: 1,
	},
	second: {
    //backgroundColor: '#8cedff',
	},
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	},
	map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
		height: 240,
  },
};


const mapStateToProps = (state, ownProps) => {
	const expanded = state.employeeForm[0] === ownProps.employee.uid;

	return { expanded };
};


export default connect(mapStateToProps, actions)(ListItem);
