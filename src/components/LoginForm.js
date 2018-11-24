import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signupUser, logOutUser } from '../actions';
import { HeadingText, Card, CardSection, Input, Button, Spinner } from './common';


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

	onButtonSUB(text){
		const { email, password } = this.props;
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

	renderSUB(){
		if(this.props.loading){
			return <Spinner size="large" />;
		}
		return (
			<Button onPress={this.onButtonSUB.bind(this)}>
				Sign Up
			</Button>
		);
	}


	render(){
		const dim = Dimensions.get('screen');

		return (
			<Card>
					<HeadingText 
						title="Login"
					/>
		
					<View style={styles.loginScreen}>
						<Text
							style={{
								textAlign: 'center',
								fontWeight: 'bold',
								letterSpacing: 5,
							}}
						>
							{"\n"}
							Skate app 4 all{"\n"}
							allows users to view{"\n"}
							various recorded {"\n"}
							skate spots.
						</Text>
					</View>

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

const dim = Dimensions.get('screen');

const styles = {
	loginScreen: {
		height: 100,
		width: dim.width,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		backgroundColor: '#fce7c8',
	},
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	bigBlue: {
		color: '#2CA8FF',
		fontSize: 30,
		paddingRight: 20,
		paddingLeft: 20,
	},
	outerC: {
		flex: 1,
		position: 'relative',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	}
}


const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading } = auth;
	return { email, password, error, loading};
};


export default connect(mapStateToProps, {
	emailChanged, passwordChanged, loginUser, signupUser 
})(LoginForm);
