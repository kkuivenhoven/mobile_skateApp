import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text, Button, Dimensions } from 'react-native';
import { HeadingText, CardSection, Card } from './common';
import { getGPS, retrieveSkateSpots } from '../actions';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import SkateSpotShow from './SkateSpotShow';
import firebase from 'firebase';

class CheckIn extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			latitude: null,
			longitude: null,
			latitudeDelta: null,
			longitudeDelta: null,
			error: null,
		};
	}


  componentWillMount(){
    this.props.retrieveSkateSpots();
    this.createDataSource(this.props);
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
    return <SkateSpotShow skate_spot={skate_spot} />; 
  }

  render(){
    var userCoords = { 
      latitude: JSON.stringify(this.state.latitude),
      longitude: JSON.stringify(this.state.longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    var GPSloc = { 
      latitude: JSON.stringify(this.state.latitude),
      longitude: JSON.stringify(this.state.longitude),
    };

    return (
      <View style={{flex: 1}}>
				<CardSection>
					<ListView
            style={ styles.lv }
						enableEmptySections
						dataSource={this.dataSource}
						renderRow={this.renderRow}
					/> 
				</CardSection>

				<CardSection>
          <MapView
            style={ styles.map }
            region={ userCoords }
            zoomEnabled={true}
            showsUserLocation={true}
          >   
              <Marker
                coordinate={ GPSloc }
              />  
            ))} 
          </MapView>
				</CardSection>

      </View>
    );  
  }
}


const dim = Dimensions.get('screen');


const styles = {
  lv: {
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

	console.log(" STATE: " + state);
	console.log(" Object.keys(state): " + Object.keys(state));
	console.log(" Object.values(state): " + Object.values(state));
	console.log(" Object.keys(state.auth): " + Object.keys(state.auth));
	console.log(" Object.values(state.auth): " + Object.values(state.auth));
	const skate_spots = _.map((state.skateSpots), (val, uid) => {
		console.log("----------------");
		console.log("uid: " + uid);
		console.log("val: " + val);
		console.log("Object.keys(val): " + Object.keys(val));
		return { ...val, uid };
	});

	return { skate_spots };
};


export default connect(mapStateToProps, { retrieveSkateSpots, getGPS })(CheckIn);
