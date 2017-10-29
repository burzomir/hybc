import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import HomeScreen from './app/views/HomeScreen';
import DeviceViews from './app/views/DeviceViews';
import ArrowScreen from './app/views/ArrowViews';
import { StackNavigator } from 'react-navigation';
// import connector from './app/lib/connect';

// const api = connector('http://192.168.43.195:8000');
// api
//   .login('test1', 'test1')
//   .then(console.log)
  // .catch(console.log);

const App_ = StackNavigator({
  Home: { screen: HomeScreen },
  Arrow: { screen: ArrowScreen },
  DeviceViews: { screen: DeviceViews },
}, {
  headerMode: "none",
});

export default class App extends React.Component {
  render() {
  return <App_/>;
  }
}