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
	componentWillMount(){
		this.props.skateSpotsFetch();
		this.createDataSource(this.props);
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
		return (
			<View style={{flex:1}}>
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow}
				/>
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
