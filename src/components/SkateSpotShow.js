import React, { Component } from 'react';
import { LayoutAnimation, TouchableWithoutFeedback, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getSkateSpot } from '../actions';
import { Card, CardSection, Button } from './common';
import { connect } from 'react-redux';
import MapView, { Marker, Polygon } from 'react-native-maps';

class SkateSpotShow extends Component {

  componentWillUpdate(){
    LayoutAnimation.spring();
  }
  
  onRowPress(){
    //Actions.employeeEdit({ employee: this.props.skate_spot }); 
    Actions.skateSpotEdit({ skate_spot: this.props.skate_spot }); 
  }

	renderDesc(){
		const { expanded, skate_spot } = this.props;
		
		if(expanded){
			return (
				<View>
					<Text>
						{"	"} {skate_spot.addr_num} {skate_spot.street} {"\n"}
						{"	"} {skate_spot.city}, {skate_spot.ab_state} {skate_spot.zip} 
					</Text>
					<Button
						onPress={() => {Actions.main({skate_spot});}}
					>
						View Skate Spot
					</Button>
				</View>
			);
		}
	}

	render() {
		const skate_spot = this.props.skate_spot;
		const { uid, name } = skate_spot;

		return (
			<TouchableWithoutFeedback
				onPress={() => this.props.getSkateSpot(uid)}
				onLongPress={this.onRowPress.bind(this)}
			>
				<View>
					<CardSection>
						<Text style={styles.titleStyle}>
							{name}
						</Text>
					</CardSection>
					{this.renderDesc()}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const dim = Dimensions.get('screen');

const styles = {
  titleStyle: {
    fontSize: 18, 
    paddingLeft: 15
  },
  map: {
    position: 'absolute',
    borderRadius: 4,
    borderWidth: 5,
    borderColor: '#d6d7da',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: dim.height/2,
  },
};


const mapStateToProps = (state, ownProps) => {
	const expanded = state.selectedId[0] === ownProps.skate_spot.uid;

	return { expanded };
};


export default connect(mapStateToProps, {getSkateSpot})(SkateSpotShow);
