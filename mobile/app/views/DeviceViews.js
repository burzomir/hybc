import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class DeviceVIews extends React.Component {
    static navigationOptions = {
      title: 'Searching',
    };
    render() {
      return (
        <View>
          <Text>Loading ......</Text>
        </View>
      );
    }
  }