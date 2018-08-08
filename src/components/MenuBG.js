import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { HeadingText, Card } from './common';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

class MenuBG extends Component {

  render(){
    return (
      <View style={styles.menu}>
        <HeadingText
          title="Menu"
        />  

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
