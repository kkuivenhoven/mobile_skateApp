import _ from 'lodash';
import React, { Component } from 'react';
import { Dimensions, View, Text, ListView } from 'react-native';
import { Card, CardSection, Button } from './common';
import { connect } from 'react-redux';
import { retrieveSkateSpots } from '../actions';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import SkateSpotShow from './SkateSpotShow';
import MapView, { Marker } from 'react-native-maps';


class SkateSpotList extends Component {
	constructor(props){
		super(props);

		this.state = {
			latitude: null,
			longitude: null,
			longitudeDelta: null,
			latitudeDelta: null,
			error: null,
		};

		navigator.geolocation.watchPosition(
			(position) => {
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					longitudeDelta: position.coords.longitudeDelta,
					latitudeDelta: position.coords.latitudeDelta,
					error: null,
				});
			},
		);
	}
	
	componentWillMount(){
		this.props.retrieveSkateSpots();
		this.createDataSource(this.props);
	}


  componentWillReceiveProps(nextProps){
    this.createDataSource(nextProps);
  }

  createDataSource({ skate_spots }){ 
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });   

    this.dataSource = ds.cloneWithRows(skate_spots);
  }

  renderRow(skate_spot){
		//console.log("inside renderRow(skate_spot)");
		console.log("************* Object.keys(skate_spot): " + Object.keys(skate_spot));
		console.log("************* Object.values(skate_spot): " + Object.values(skate_spot));
		console.log("************* skate_spot: " + skate_spot);
    return <SkateSpotShow skate_spot={skate_spot} />; 
  }

  _getCoords(skate_spots){
    var latLng = []; 
    for(var key in skate_spots) {
      var obj = skate_spots[key];
      for (var prop in obj) {
        if(prop == "name"){
          latLng.push({latitude: obj["lat"], longitude: obj["lng"]});
        }   
      }   
    }   
    return latLng;
  }


	render(){
    var userCoords = { 
      latitude: JSON.stringify(this.state.latitude),
      longitude: JSON.stringify(this.state.longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }; 

		return (
			<View style={{flex:1}}>
				<View style={styles.topGrid}>
					<ListView
						enableEmptySections
						dataSource={this.dataSource}
						renderRow={this.renderRow}
					/>
				</View>
				<View style={styles.bottomGrid}>
          <MapView
            style={ styles.map }
						region={ userCoords }
            zoomEnabled={true}
            showsUserLocation={true}
          >   
            {this._getCoords(this.props.skate_spots).map(marker => (
              <Marker
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
              />  
            ))} 
          </MapView>
				</View>
			</View>
		);
	}
}


const dim = Dimensions.get('screen');

const styles = {
	topGrid: {
		borderRadius: 4,
		borderWidth: 5,
		borderColor: '#d6d7da',
	},
	bottomGrid: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: dim.height/2,
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


const mapStateToProps = state => {
	console.log("state.skateSpots: " + state.skateSpots);
	console.log("Object.keys(state.skateSpots): " + Object.keys(state.skateSpots));
	console.log("Object.values(state.skateSpots): " + Object.values(state.skateSpots));
	const skate_spots = _.map((state.skateSpots), (val, uid) => {
		return { ...val, uid };
	});
	console.log("skate_spots: " + skate_spots);
	console.log("Object.keys(skate_spots): " + Object.keys(skate_spots));
	console.log("Object.values(skate_spots): " + Object.values(skate_spots));

	return { skate_spots };
};
	

export default connect(mapStateToProps, { retrieveSkateSpots })(SkateSpotList);
