import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class HomeScreen extends Component {
    static navigationOptions = {
      title: 'FInd me app',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <Button
            onPress={() => navigate('DeviceVIews')}
            title="Knowing Friend List"
          />
          <Button
            onPress={() => navigate('DeviceVIews')}
            title="Search"
          />
        </View>
      );
    }
  }