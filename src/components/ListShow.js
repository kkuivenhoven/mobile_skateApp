/* Resources:
	• https://stackoverflow.com/questions/34625829/change-button-style-on-press-in-react-native
*/
import React, { Component } from 'react';
import { TouchableHighlight, LayoutAnimation, Text, TouchableWithoutFeedback, View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection } from './common';
import DoubleClick from 'react-native-double-click';
import { connect } from 'react-redux';
//import * as actions from '../actions';
import { saveTime, skateSpotUpdate, updateCIusers } from '../actions';
import EmployeeForm from './EmployeeForm';
import StopWatch from './StopWatch';
import MapView, { Marker, Polyline, Polygon, Overlay, Circle } from 'react-native-maps';
import GeoFencing from 'react-native-geo-fencing';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import TimeFormatter from 'minutes-seconds-milliseconds';


class ListShow extends Component {
	constructor(props){
		super(props);

		this.state = {
			inFence: false,
			clicked: false,
			isRunning: false,
			mainTimer: null,
			lapTimer: null,
			mainTimerStart: null,
			lapTimerStart: null,
			userLat: null,
			userLng: null,
			error: null,
		};

	}

	// with only point and polygon
	componentDidMount() {
		const polygon = [
			{ lat: this.props.employee[1].NE_lat, lng: this.props.employee[1].NE_lng },
			{ lat: this.props.employee[1].SW_lat, lng: this.props.employee[1].NE_lng },
			{ lat: this.props.employee[1].SW_lat, lng: this.props.employee[1].SW_lng },
			{ lat: this.props.employee[1].NE_lat, lng: this.props.employee[1].SW_lng },
			{ lat: this.props.employee[1].NE_lat, lng: this.props.employee[1].NE_lng },
		];

		const point = {
			lat: this.props.employee[1].lat,
			lng: this.props.employee[1].lng,
		};

	 
		//GeoFencing.containsLocation(goAway, polygon)
		GeoFencing.containsLocation(point, polygon)
			.then(() => console.log('point is within polygon'))
			.catch(() => console.log('point is NOT within polygon'))
			//.then(() => {this.setState({inFence: true,});})
			//.catch(() => {this.setState({inFence: false,});})
			//.then(() => console.log('point is within polygon'))
			//.catch(() => console.log('point is NOT within polygon'))

	}

	getRadius(){
		var diff;
		diff = ((this.props.employee[1].NE_lat)-(this.props.employee[1].SW_lat));
		console.log("DIFF: " + diff);
		return diff;
	}

	checkLocation(){
		console.log(" IN SIDE CHECK LOCATION FUNCTION ");
		const polygon = [
			{ lat: this.props.employee[1].NE_lat, lng: this.props.employee[1].NE_lng },
			{ lat: this.props.employee[1].SW_lat, lng: this.props.employee[1].NE_lng },
			{ lat: this.props.employee[1].SW_lat, lng: this.props.employee[1].SW_lng },
			{ lat: this.props.employee[1].NE_lat, lng: this.props.employee[1].SW_lng },
			{ lat: this.props.employee[1].NE_lat, lng: this.props.employee[1].NE_lng },
		];
		var goAway = [];
    /*navigator.geolocation.watchPosition(
      (position) => {
          this.setState({
            userLat: position.coords.latitude,
            userLng: position.coords.longitude,
            error: null,
          }, () => {
						console.log("this.state.latitude: " + this.state.userLat);
            goAway.push({lat: this.state.userLat, lng: this.state.userLng});
          }); 
      },  
    );*/ 
		navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLat: position.coords.latitude,
          userLng: position.coords.longitude,
          error: null,
        }, () => {
					goAway.push({lat: this.state.userLat, lng: this.state.userLng});
					GeoFencing.containsLocation(goAway[0], polygon)
						.then(() => {this.setState({inFence: true,});})
						.catch(() => {this.setState({inFence: false,});})
				});
      },
      (error) => console.log("error: " + error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
	}


  handleStartStop(){
    let { isRunning, mainTimer, lapTimer } = this.state;

    if(isRunning){
      clearInterval(this.interval);
			if(this.props.employee[1].userTime > 0){
				var newTotal = this.props.employee[1].userTime;
				newTotal += this.state.mainTimer;
				this.props.saveTime({ userTime: newTotal, uid: this.props.employee[0] });
			}
			else{
				this.props.saveTime({ userTime: this.state.mainTimer, uid: this.props.employee[0] });
			}
			//this.props.skateSpotUpdate({ userTime: this.state.mainTimer });
      this.setState({
        isRunning: false,
        lapTimer: ''
      }); 
      return;
    }   

    // case 2: start button clicked
    this.setState({
      mainTimerStart: new Date(),
      lapTimerStart: new Date(),
      isRunning: true
    }); 

    this.interval = setInterval(() => {
      this.setState({
        mainTimer: new Date() - this.state.mainTimerStart + mainTimer,
        lapTimer: new Date() - this.state.lapTimerStart + lapTimer,
      }); 
    }, 30);
  }
  

  handleLapReset(){
    let { isRunning } = this.state;
  
    if(!isRunning){
      laps: [], 
      this.setState({
        mainTimerStart: null,
        lapTimerStart: null,
        mainTimer: 0, // time elapsed set to 0 for mainTimer
        lapTimer: 0,
      }); 
    }   
    // case 2
  }


  _renderStart(){
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight onPress={this.handleStartStop.bind(this)} style={styles.button}>
          <Text>{ this.state.isRunning? 'Stop' : 'Start' }</Text>
        </TouchableHighlight>
      </View>
    );
  }


  _timerButton(){
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight onPress={this.handleStartStop.bind(this)} style={styles.button}>
          <Text>{ this.state.isRunning? 'Stop' : 'Start' }</Text>
        </TouchableHighlight>
      </View>
    );
  }


  _renderTimers(){
    return (
      <View style={styles.timerWrapper}>
        <View style={styles.timerWrapperInner}>
          <Text style={styles.lapTimer}>{ TimeFormatter(this.state.lapTimer) }</Text>
          <Text style={styles.mainTimer}>{ TimeFormatter(this.state.mainTimer) }</Text>
        </View>
      </View>
    );
  }


	inFenceCheck(){
		console.log("this.state.inFence: " + this.state.inFence);
		this.setState({clicked: true,});
	}


	startTimer(){
		//if(this.state.clicked == true){
		if(this.state.inFence == true){
				//<StopWatch/>
			return (
				<Card>
					<CardSection>
						{this._renderTimers()}
					</CardSection>
					{this._renderStart()}
				</Card>
			);
		}
	}
	

	render(){
		const employee = this.props.employee;
		const { uid } = this.props.employee;

			return (

				<View style={{flex: 1}}>
					<CardSection>
						<Text>
							{"  "} {employee[1].addr_num} {employee[1].street} {"\n"}
							{"  "} {employee[1].city}, {employee[1].ab_state} {employee[1].zip} {employee[1].country} {"\n"}
							{"  "} {employee[1].userTime}
						</Text>
						<Button onPress={() => this.props.updateCIusers(uid)}>
							Update
						</Button>
						<Button onPress={() => this.checkLocation()}>
							Check Location
						</Button>
					</CardSection>


					<Card>
						{this.startTimer()}
					</Card>


					<View style={styles.bottomGrid}>
						<MapView
							style={ styles.map }
							zoomEnabled={true}
							showsUserLocation={true}
							initialRegion={{
								latitude: employee[1].lat,
								longitude: employee[1].lng,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421,
							}}
						>
							<Polygon
								coordinates={[
									{ latitude: employee[1].NE_lat, longitude: employee[1].NE_lng },
									{ latitude: employee[1].SW_lat, longitude: employee[1].NE_lng },
									{ latitude: employee[1].SW_lat, longitude: employee[1].SW_lng },
									{ latitude: employee[1].NE_lat, longitude: employee[1].SW_lng },
									{ latitude: employee[1].NE_lat, longitude: employee[1].NE_lng },
								]}
								fillColor='rgba(44,168,255,.50)'
							/>
							<Marker
								coordinate={{latitude: employee[1].lat, longitude: employee[1].lng}}
							/>
						</MapView>
					</View>
        </View>

			);
	}
}

const dim = Dimensions.get('screen');

const styles = {
	bottomGrid: {
		flex: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: dim.height/2,
	},
	first: {
	  //backgroundColor: '#a5e5a0',
		height: 300,
		flex: 1,
	},
	second: {
    //backgroundColor: '#8cedff',
	},
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
  top: {
    flex: 1,
  },
  bottom: {
    flex: 2,
  },
  timerWrapperInner: {
    borderWidth: 0.5,
    alignSelf: 'center',
  },
  timerWrapper: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    flex: 1,
  },
  mainTimer: {
    fontSize: 25,
    fontWeight: '100',
    alignSelf: 'flex-end',
  },
  lapTimer: {
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 30,
  },
  button: {
    height: 35,
    width: 35,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
};



const mapStateToProps = (state) => {
	const employee = state.employeeForm;

  return { employee };
};


//export default connect(mapStateToProps, actions)(ListShow);
export default connect(mapStateToProps, {
	saveTime, skateSpotUpdate, updateCIusers
})(ListShow);
