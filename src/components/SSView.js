import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { HeadingText, Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker, Polygon } from 'react-native-maps';
import GeoFencing from 'react-native-geo-fencing';
import _ from 'lodash';

class SSView extends Component {

	checkLocation(){
		console.log("INSIDE CHECK LOCATION FUNCTION");
    const polygon = [ 
      { lat: this.props.skate_spot.NE_lat, lng: this.props.skate_spot.NE_lng },
      { lat: this.props.skate_spot.SW_lat, lng: this.props.skate_spot.NE_lng },
      { lat: this.props.skate_spot.SW_lat, lng: this.props.skate_spot.SW_lng },
      { lat: this.props.skate_spot.NE_lat, lng: this.props.skate_spot.SW_lng },
      { lat: this.props.skate_spot.NE_lat, lng: this.props.skate_spot.NE_lng },
    ];  
		console.log("this.props.skate_spot.NE_lat: " + this.props.skate_spot.NE_lat);
		console.log("this.props.skate_spot.NE_lng: " + this.props.skate_spot.NE_lng);
		var userLocation = [];

		navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLat: position.coords.latitude,
          userLng: position.coords.longitude,
          error: null,
        }, () => {
          userLocation.push({lat: this.state.userLat, lng: this.state.userLng});
          GeoFencing.containsLocation(userLocation[0], polygon)
            .then(() => { console.log("contains location!"); this.setState({inFence: true,});})
            .catch(() => {this.setState({inFence: false,});})
        });
      },
      (error) => console.log("error: " + error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
			);
	}

  render(){
		const dim = Dimensions.get('screen');
		const { name, lat, lng, addr_num, city, ab_state, country, street, zip } = this.props.skate_spot;
		const { skate_spot, circleCoords, two_circleCoords, three_circleCoords, four_circleCoords, five_circleCoords } = this.props;

		var i;
		console.log("Object.keys(this.props): " + Object.keys(this.props));
		console.log("Object.keys(this.props.skate_spot): " + Object.keys(this.props.skate_spot));
		for(i=0; i < circleCoords.length; i++){
			/*console.log("________________________________________");
			console.log("circleCoords[" + i + "].latitude: " + circleCoords[i].latitude);
			console.log("circleCoords[" + i + "].longitude: " + circleCoords[i].longitude);*/
		}

    return (
      <View>
        <HeadingText
          title={name}
        />  

				<View style={{ width: dim.width, height: 100 }}>
					<Text
						style={{
							fontSize: 20,
							textAlign: 'center',
						}}
					>
						{addr_num} {street} {"\n"}
						{city}, {ab_state} {zip}
					</Text>
					<Button onPress={() => this.checkLocation()}>
						Check Location
					</Button>
				</View>

				<View style={{ width: dim.width, height: 100 }}>
	            <MapView
              style={ styles.map }
              zoomEnabled={true}
              showsUserLocation={true}
              initialRegion={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}  
            >   
            <Polygon
              coordinates={[
                  { latitude: five_circleCoords[0].latitude, longitude: five_circleCoords[0].longitude },
                  { latitude: five_circleCoords[1].latitude, longitude: five_circleCoords[1].longitude },
                  { latitude: five_circleCoords[2].latitude, longitude: five_circleCoords[2].longitude },
                  { latitude: five_circleCoords[3].latitude, longitude: five_circleCoords[3].longitude },
                  { latitude: five_circleCoords[4].latitude, longitude: five_circleCoords[4].longitude },
                  { latitude: five_circleCoords[5].latitude, longitude: five_circleCoords[5].longitude },
                  { latitude: five_circleCoords[6].latitude, longitude: five_circleCoords[6].longitude },
                  { latitude: five_circleCoords[7].latitude, longitude: five_circleCoords[7].longitude },
                  { latitude: five_circleCoords[8].latitude, longitude: five_circleCoords[8].longitude },
                  { latitude: five_circleCoords[9].latitude, longitude: five_circleCoords[9].longitude },
                  { latitude: five_circleCoords[10].latitude, longitude: five_circleCoords[10].longitude },
                  { latitude: five_circleCoords[11].latitude, longitude: five_circleCoords[11].longitude },
                  { latitude: five_circleCoords[12].latitude, longitude: five_circleCoords[12].longitude },
                  { latitude: five_circleCoords[13].latitude, longitude: five_circleCoords[13].longitude },
                  { latitude: five_circleCoords[0].latitude, longitude: five_circleCoords[0].longitude },
                ]}  
                fillColor='rgba(255,44,44,.25)'
              />  
              <Marker
                coordinate={{latitude: skate_spot.lat, longitude: skate_spot.lng}}
              />  
            </MapView>
				</View>
      </View>
    );  
  }
}

const dim = Dimensions.get('screen');

const styles = {
	infoBox: {
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
	}
};


const mapStateToProps = (state, ownProps) => {
	console.log("------- SSView.js -------");

	const tag = "Hola, bienvenidos";

	const skate_spot = ownProps.skate_spot;
	//const skate_spots = state.skateSpots;

	//var r = (skate_spot.NE_lat - skate_spot.lat);
	var r = (3/3959);
	//var r = (10/3959);
	console.log("r: " + r);

	var circleCoords = []
	var angles = [0, 45, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
	var i;
	var x, y;
	for(i=0; i < angles.length; i++){
		x = skate_spot.lat + (r + r*Math.cos(angles[i]*(Math.PI/180)));
		y = skate_spot.lng + (r + r*Math.sin(angles[i]*(Math.PI/180)));
		circleCoords.push({latitude: x, longitude: y});
	}

	var two_circleCoords = []
	for(i=0; i < angles.length; i++){
		x = skate_spot.lat + (r + Math.cos(angles[i]*(Math.PI/180)));
		y = skate_spot.lng + (r + Math.sin(angles[i]*(Math.PI/180)));
		two_circleCoords.push({latitude: x, longitude: y});
	}

	var three_circleCoords = []
	for(i=0; i < angles.length; i++){
		x = skate_spot.lat + (r + r*Math.cos(angles[i]));
		y = skate_spot.lng + (r + r*Math.sin(angles[i]));
		three_circleCoords.push({latitude: x, longitude: y});
	}

	var four_circleCoords = []
	for(i=0; i < angles.length; i++){
		x = skate_spot.lat + (r + Math.cos(angles[i]));
		y = skate_spot.lng + (r + Math.sin(angles[i]));
		four_circleCoords.push({latitude: x, longitude: y});
	}

	var five_circleCoords = []
	for(i=0; i < angles.length; i++){
		x = skate_spot.lat + r*Math.cos(angles[i]*(Math.PI/180));
		y = skate_spot.lng + r*Math.sin(angles[i]*(Math.PI/180));
		five_circleCoords.push({latitude: x, longitude: y});
	}

	/*const skate_spots = _.reduce((state.skateSpots), (n) => {
		console.log("=-=-= Object.keys(n): " + Object.keys(n));
		console.log("=-=-= Object.values(n): " + Object.values(n));
		return n;*/
		/*const point = {
			lat: n.lat,
			lng: n.lng,
		};*/

		/*GeoFencing.containsLocation(point, circleCoords)
			.then(() => console.log("point is within polygon"))
			.catch(() => console.log("point is NOT within polygon"))*/
	/*});*/


	return { skate_spot, tag, circleCoords, two_circleCoords, three_circleCoords, four_circleCoords, five_circleCoords };

};

export default connect(mapStateToProps, {})(SSView);
