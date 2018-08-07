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

	componentWillMount(){
		this.props.retrieveSkateSpots();
		this.createDataSource(this.props);
	}


  componentWillReceiveProps(nextProps){
		console.log("typeof(nextProps): " + typeof(nextProps));
		console.log("Object.keys(nextProps): " + Object.keys(nextProps));
		console.log("Object.values(nextProps): " + Object.values(nextProps));
		console.log("Object.keys(nextProps.skate_spots): " + Object.keys(nextProps.skate_spots));
		console.log("Object.values(nextProps.skate_spots): " + Object.values(nextProps.skate_spots));
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
		return (
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}
}


const mapStateToProps = state => {
	const skate_spots = _.map((state.skateSpots), (val, uid) => {
		return { ...val, uid };
	});

	return { skate_spots };
};
	

export default connect(mapStateToProps, { retrieveSkateSpots })(SkateSpotList);
