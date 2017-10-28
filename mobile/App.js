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
import { StackNavigator } from 'react-navigation';



const App_ = StackNavigator({
  Home: { screen: HomeScreen },
  DeviceVIews: { screen: DeviceVIews },
});

export default class App extends React.Component {
  render() {
    return <App_/>;
  }
}

