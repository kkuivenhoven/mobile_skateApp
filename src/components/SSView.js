import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { HeadingText, Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker, Polygon } from 'react-native-maps';
import GeoFencing from 'react-native-geo-fencing';
import _ from 'lodash';

class SSView extends Component {

  render(){
		const { name, lat, lng } = this.props.skate_spot;
		const { skate_spot, circleCoords } = this.props;

    return (
      <Card>
        <HeadingText
          title={name}
        />  

				<View>
					<Text>
						{this.props.tag}
					</Text>
				</View>

				<View>
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
                  { latitude: circleCoords[0].latitude, longitude: circleCoords[0].longitude },
                  { latitude: circleCoords[1].latitude, longitude: circleCoords[1].longitude },
                  { latitude: circleCoords[2].latitude, longitude: circleCoords[2].longitude },
                  { latitude: circleCoords[3].latitude, longitude: circleCoords[3].longitude },
                  { latitude: circleCoords[4].latitude, longitude: circleCoords[4].longitude },
                  { latitude: circleCoords[5].latitude, longitude: circleCoords[5].longitude },
                  { latitude: circleCoords[6].latitude, longitude: circleCoords[6].longitude },
                  { latitude: circleCoords[7].latitude, longitude: circleCoords[7].longitude },
                  { latitude: circleCoords[8].latitude, longitude: circleCoords[8].longitude },
                  { latitude: circleCoords[9].latitude, longitude: circleCoords[9].longitude },
                  { latitude: circleCoords[10].latitude, longitude: circleCoords[10].longitude },
                  { latitude: circleCoords[11].latitude, longitude: circleCoords[11].longitude },
                  { latitude: circleCoords[12].latitude, longitude: circleCoords[12].longitude },
                  { latitude: circleCoords[13].latitude, longitude: circleCoords[13].longitude },
                  { latitude: circleCoords[0].latitude, longitude: circleCoords[0].longitude },
								]}
                fillColor='rgba(44,168,255,.50)'
              />  
							<Marker
								coordinate={{latitude: skate_spot.lat, longitude: skate_spot.lng}}
							/>
            </MapView>
				</View>

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
	}
};


const mapStateToProps = (state, ownProps) => {
	console.log("------- SSView.js -------");

	const tag = "Hola, bienvenidos";

	const skate_spot = ownProps.skate_spot;
	//const skate_spots = state.skateSpots;

	//var r = (skate_spot.NE_lat - skate_spot.lat);
	//var r = (3/3959);
	var r = (10/3959);
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

	const skate_spots = _.reduce((state.skateSpots), (n) => {
		/*console.log("=-=-= Object.keys(n): " + Object.keys(n));
		console.log("=-=-= Object.values(n): " + Object.values(n));
		return n;*/
		/*const point = {
			lat: n.lat,
			lng: n.lng,
		};*/

		/*GeoFencing.containsLocation(point, circleCoords)
			.then(() => console.log("point is within polygon"))
			.catch(() => console.log("point is NOT within polygon"))*/
	});


	return { skate_spot, tag, circleCoords };

};

export default connect(mapStateToProps, {})(SSView);
