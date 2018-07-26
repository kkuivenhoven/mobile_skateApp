/* Resources:
	• https://stackoverflow.com/questions/34625829/change-button-style-on-press-in-react-native
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
  constructor(props) {
    super(props);

    this.state = { 
      latitude: null,
      longitude: null,
      error: null,
    };  
  }

	componentWillMount(){
    navigator.geolocation.watchPosition(
      (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          }); 
      },  
    ); 
	}

	componentWillUpdate(){
		LayoutAnimation.spring();
	}
	
	onRowPress(){
		Actions.employeeEdit({ employee: this.props.employee });
	}

	check(){
		const { employee, expanded } = this.props;
	}

	renderDescription(){
		const { employee, expanded } = this.props;
	
		if(expanded){
			return (
				<View>
					<Text>
						{"	"} {employee.addr_num} {employee.street} {"\n"}
						{"	"} {employee.city}, {employee.ab_state} {employee.zip} {employee.country}
					</Text>
					<Button
						onPress={() => {Actions.skateSpotShow(); }}
					>
						Show
					</Button>
				</View>
			);
		}
	}

	render(){
		const { NE_lat, SW_lat, uid, name, zip, expanded } = this.props.employee;
		const { titleStyle, first, second } = styles;

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
		//height: 300,
		//flex: 1,
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
