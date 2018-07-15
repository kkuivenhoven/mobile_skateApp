import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from './common';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { skateSpotsFetch, logoutUser } from '../actions';
import ListItem from './ListItem';
import { Actions } from 'react-native-router-flux';

class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

	componentWillMount(){
		this.props.skateSpotsFetch();
		this.createDataSource(this.props);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
	}

	componentWillReceiveProps(nextProps){
		this.createDataSource(nextProps);
	}


	createDataSource({ employees }){
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(employees);
	}



	renderRow(employee){
		return <ListItem employee={employee} />;
	}

	render(){
		console.log("inside EL");
		console.log(this.state);
		console.log(this.state);
		console.log(this.state.latitude);
		console.log(this.state.longitude);

		return (
			<View style={{flex:1}}>
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow}
				/>
				<Button onPress={() => {Actions.navigation(); }}>
					Nav
				</Button>
				<Button onPress={() => {Actions.newPage(); }}>
					New page
				</Button>
			</View>
		);
	}
}


const mapStateToProps = state => {
	const employees = _.map((state.employees), (val, uid) => {
		return { ...val, uid };
	});
	
	return { employees };
};



export default connect(mapStateToProps, { skateSpotsFetch, logoutUser })(EmployeeList);
