import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signupUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';


class LoginForm extends Component {
	onEmailChange(text){
		this.props.emailChanged(text);
	}

	onPasswordChange(text){
		this.props.passwordChanged(text);
	}

	onButtonPress(text){
		const { email, password } = this.props;
		this.props.loginUser({ email, password });
	}

	onButtonPressSU(text){
		const { email, password } = this.props;
		console.log(this.props.signupUser());
		this.props.signupUser({ email, password });
	}


	renderError(){
		if(this.props.error){
			return(
				<View style={{ backgroundColor: 'white' }}>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		}
	}


	renderButton(){
		if(this.props.loading){
			return <Spinner size="large" />;
		}
		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Login
			</Button>
		);
	}

	renderSignUpButton(){
		if(this.props.loading){
			return <Spinner size="large" />;
		}
		console.log("FIRST: read this:");
		console.log(this.onButtonPressSU.bind(this));
		return (
			<Button onPress={this.onButtonPressSU.bind(this)}>
				Sign Up
			</Button>
		);
	}


	render(){
		return (
			<Card>
				<CardSection>
					<Input
						label="Email"
						placeholder="email@gmail.com"
						onChangeText={this.onEmailChange.bind(this)}
						value={this.props.email}
					/>
				</CardSection>


				<CardSection>
					<Input
						secureTextEntry
						label="Password"
						placeholder="password"
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/>
				</CardSection>

				{this.renderError()}
	
				<CardSection>
					{this.renderButton()}
				</CardSection>

			</Card>
		);
	}
}


const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
}


const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading } = auth;
	return { email, password, error, loading};
};


export default connect(mapStateToProps, {
	emailChanged, passwordChanged, loginUser
})(LoginForm);
