import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Animated
} from 'react-native';

import Triangle from '../components/triangle';
export default class HomeScreen extends Component {
    static navigationOptions = {
      title: 'FInd me app',
    };

    render() {
      const { navigate } = this.props.navigation;
      this.animatedValue = new Animated.Value(0);
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 500
      }).start()
      const interpolateRotation = this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '0deg'],
      })
      const animatedStyle = {
        transform: [
          { rotate: interpolateRotation }
        ]
      }

      return (
        <View>
           <Animated.View style={[animatedStyle]}>
          <Triangle />
          </Animated.View>
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