import React, { Component } from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import { HeadingText, CardSection, Card } from './common';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

class MenuBG extends Component {

  render(){
    return (
      <View style={styles.menu}>
        <HeadingText
          title="Menu"
        />  

        <CardSection>
          <Button
            onPress={() => {Actions.new_skateSpotGPSCreate(); }}
						title="Add Spot (GPS)"
          > 
            Add Spot (GPS)
          </Button> 
        </CardSection>
        
        <CardSection>
          <Button
            onPress={() => {Actions.newSkateSpotCreate(); }}
						title="Add Spot (address)"
          > 
            Add Spot (address)
          </Button> 
        </CardSection>

        <CardSection>
          <Button
            onPress={() => { Actions.skateSpotList(); }}
						title="Skate Spot List"
          > 
            Skate Spot List
          </Button>
        </CardSection>

        <CardSection>
          <Button
            onPress={() => { Actions.logout(); }}
						title="Log Out"
          > 
            Log Out
          </Button>
        </CardSection>

      </View>
    );  
  }
}


const dim = Dimensions.get('screen');


const styles = {
	menu: {
		flex: 1,
		height: dim.height,
		backgroundColor: '#f2f3ff',
	},
};

export default MenuBG;
