import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';

class LogoutForm extends Component {

	render(){
		return(
			<Card>
				<CardSection>
					<Text>Hi</Text>
				</CardSection>
			</Card>
		);
	}
}

	

export default connect()(LogoutForm);
