/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import HomeScreen from './app/views/HomeScreen';
import DeviceVIews from './app/views/DeviceViews';
import LoginScreen from './app/views/LoginScreen';
import { StackNavigator } from 'react-navigation';
import connector from './app/lib/connect';

const api = connector('http://192.168.43.195:8000');
api
  .login('test1', 'test1')
  .then(console.log)
  .catch(console.log);

const App_ = StackNavigator({
  // Login: { screen: LoginScreen},
  Home: { screen: HomeScreen },
  DeviceVIews: { screen: DeviceVIews },
});

export default class App extends React.Component {
  render() {
    return <App_ />;
  }
}

