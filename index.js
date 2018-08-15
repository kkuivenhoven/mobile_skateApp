import { AppRegistry } from 'react-native';
import App from './src/App';

// disables RN dev warnings
console.disableYellowBox = true;

AppRegistry.registerComponent('mobile_skateApp', () => App);
