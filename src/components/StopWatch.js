import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import TimeFormatter from 'minutes-seconds-milliseconds';
import { Card, CardSection } from './common';


class StopWatch extends Component { 
	constructor(props){
		super(props);

		this.state={
			isRunning: false,
			mainTimer: null,
			lapTimer: null,
			mainTimerStart: null,
			lapTimerStart: null,
		}
	}


	handleStartStop(){
		let { isRunning, mainTimer, lapTimer } = this.state;

		if(isRunning){
			clearInterval(this.interval);
			this.setState({
				isRunning: false
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



	_renderButtons(){
		return (
			<View style={styles.buttonWrapper}>
				<TouchableHighlight onPress={this.handleLapReset.bind(this)} style={styles.button}>
					<Text>Lap</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={this.handleStartStop.bind(this)} style={styles.button}>
					<Text>Start</Text>
				</TouchableHighlight>
			</View>
		);
	}

	_renderStart(){
		return (
			<View style={styles.buttonWrapper}>
				<TouchableHighlight onPress={this.handleStartStop.bind(this)} style={styles.button}>
					<Text>Start</Text>
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

	render(){
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


const styles = {
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


export default StopWatch;
