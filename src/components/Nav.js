import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { HeadingText, Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import GeoFencing from 'react-native-geo-fencing';

class Navigation extends Component {

  render(){
    return (
      <Card>
        <HeadingText
          title="Navigation"
        />  

        <CardSection>
          <Button
						onPress={() => {Actions.skateSpotGPSCreate(); }}
					>
						Add Spot via GPS	
					</Button>
        </CardSection>

        <CardSection>
          <Button
						onPress={() => {Actions.new_skateSpotGPSCreate(); }}
					>
						New Add Spot via GPS	
					</Button>
        </CardSection>


        <CardSection>
          <Button
						onPress={() => {Actions.skateSpotCreate(); }}
					>
						Add Spot	
					</Button>
        </CardSection>

        <CardSection>
          <Button
						onPress={() => {Actions.fetchSkateSpotList(); }}
					>
						Skate Spot List
					</Button>
        </CardSection>

        <CardSection>
          <Button
						onPress={() => { firebase.auth().signOut(); Actions.pop(); }}
					>
						Log Out
					</Button>
        </CardSection>

      </Card>
    );  
  }
}

export default Navigation;
