import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { HeadingText, Card, CardSection, Button } from './common';


class Navigation extends Component {
  render(){
    return (
      <Card>
        <HeadingText
          title="Navigation"
        />  

        <CardSection>
          <Button>
            Link 1
          </Button> 
        </CardSection>

        <CardSection>
          <Button>
            Link 2
          </Button> 
        </CardSection>

        <CardSection>
          <Button>
            Link 3
          </Button> 
        </CardSection>

      </Card>
    );  
  }
}

export default Navigation;
