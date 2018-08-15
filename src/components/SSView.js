import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { HeadingText, Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker, Polygon } from 'react-native-maps';
import GeoFencing from 'react-native-geo-fencing';

class SSView extends Component {

  render(){
		const { name, lat, lng } = this.props.skate_spot;
		const { skate_spot, circleCoords } = this.props;

		var i;
		for(i=0; i < circleCoords.length; i++){
			console.log("=====================================");
			console.log("(((((( Object.keys(circleCoords[" + i + "]): " + Object.keys(circleCoords[i]));
			console.log("{{{{{{ Object.values(circleCoords[" + i + "]): " + Object.values(circleCoords[i]));
		}
	
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
	console.log("--- Object.keys(state): " + Object.keys(state));
	console.log("--- Object.values(state): " + Object.values(state));
	console.log("--- Object.keys(ownProps): " + Object.keys(ownProps));
	console.log("--- Object.values(ownProps): " + Object.values(ownProps));
	console.log("--- Object.keys(ownProps.skate_spot): " + Object.keys(ownProps.skate_spot));
	console.log("--- Object.values(ownProps.skate_spot): " + Object.values(ownProps.skate_spot));

	const skate_spot = ownProps.skate_spot;

	//var r = (skate_spot.NE_lat - skate_spot.lat);
	var r = (3/3959);
	console.log("r: " + r);

	var circleCoords = []
	var angles = [0, 45, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
	var i;
	var x, y;
	for(i=0; i < angles.length; i++){
		//x = skate_spot.lat + (r +  Math.cos(angles[i]));
		//y = skate_spot.lng + (r +  Math.sin(angles[i]));
		//x = skate_spot.lat + (r + Math.cos(angles[i]*(Math.PI/180)));
		//y = skate_spot.lng + (r + Math.sin(angles[i]*(Math.PI/180)));
		x = skate_spot.lat + (r + r*Math.cos(angles[i]*(Math.PI/180)));
		y = skate_spot.lng + (r + r*Math.sin(angles[i]*(Math.PI/180)));
		circleCoords.push({latitude: x, longitude: y});
	}

	console.log(">> Object.keys(circleCoords): " + Object.keys(circleCoords));
	console.log(">> Object.values(circleCoords): " + Object.values(circleCoords));

	for(i=0; i < angles.length; i++){
		console.log("--------------------------------------------");
		console.log("%%>> Object.keys(circleCoords[" + i + "]): " + Object.keys(circleCoords[i]));
		console.log("%%>> Object.values(circleCoords[" + i + "]): " + Object.values(circleCoords[i]));
	}

	const tag = "Hola, bienvenidos";

	return { skate_spot, tag, circleCoords };

};

export default connect(mapStateToProps, {})(SSView);
