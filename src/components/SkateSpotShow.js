import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { skateSpotUpdate, skateSpotCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker, Polygon } from 'react-native-maps';

class SkateSpotShow extends Component {
	render() {
		const skate_spot = this.props.skate_spot;
		/*const { addr_num, street, city, ab_state, zip, country, userTime } = this.props.skate_spot;*/
		console.log(">< Object.keys(skate_spot): " + Object.keys(skate_spot));
		console.log(">< Object.values(skate_spot): " + Object.values(skate_spot));
		//console.log(">< Object.keys(Object.values(skate_spot)): " + Object.keys(Object.values(skate_spot)));
		/*console.log(">< Object.keys(this.props): " + Object.keys(this.props));
		console.log(">< Object.values(this.props.skate_spot): " + Object.values(this.props.skate_spot));
		console.log(">< skate_spot.addr_num: " + skate_spot.addr_num);
		console.log(">< addr_num: " + addr_num);*/

		return (
			<Card>
				<CardSection>
					<Text>
						{"	"} {skate_spot.name} {"\n"}
						{"	"} {skate_spot.addr_num} {skate_spot.street} {skate_spot.city} {"\n"}
						{"	"} {skate_spot.zip} {skate_spot.country}
					</Text>
				</CardSection>
			</Card>
		);
	}
}

const dim = Dimensions.get('screen');

const styles = {
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


//const mapStateToProps = (state) => {
const mapStateToProps = (state, ownProps) => {
	console.log("SKATE SPOT SHOW");
	console.log("Object.keys(ownProps): " + Object.keys(ownProps));
	console.log("ownProps.skate_spot: " + ownProps.skate_spot);
	/*console.log("Object.keys(state): " + Object.keys(state));
	console.log("Object.keys(state.skateSpots): " + Object.keys(state.skateSpots));
	console.log("Object.values(state.skateSpots): " + Object.values(state.skateSpots));*/
	//const skate_spot = state.skateSpots;
	const skate_spot = ownProps.skate_spot;

	return { skate_spot };
};


export default connect(mapStateToProps, {skateSpotUpdate, skateSpotCreate})(SkateSpotShow);
