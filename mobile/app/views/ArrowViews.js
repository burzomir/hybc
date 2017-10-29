import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Animated
} from 'react-native';
import Triangle from '../components/triangle';

export default class DeviceVIews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.onUpdate = this.onUpdate.bind(this);
  }
  onUpdate(value) {
    this.setState({ value });
  }
    render() {
        this.animatedValue = new Animated.Value(0);
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 500
          }).start()
          const interpolateRotation = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['200deg', '280deg'],
          })
          const animatedStyle = {
            transform: [
              { rotate: interpolateRotation }
            ]
          }
      return (
        <View style={styles.container}>
          <Text style={styles.text}>FOLLOW</Text>
          <Text style={styles.bigText}>arrow</Text>
          <View style={styles.form}>
          <Animated.View style={[animatedStyle]}>
          <Triangle />
          </Animated.View>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      padding: 30,
      flex: 1,
      flexDirection: "column",
      alignItems: "stretch",
      backgroundColor: "#1b1f2e"
    },
    text: {
      marginTop: 30,
      fontSize: 26,
      textAlign: "center",
      color: "#ffffff",
      fontFamily: "Futura-Boo",
      marginBottom: 0
    },
    bigText: {
      marginTop: -10,
      fontSize: 30,
      textAlign: "center",
      color: "#ffffff",
      fontFamily: "FuturaDisComD",
      fontSize: 75,
    },
    form: {
      flex: 1,
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "center",
    },
  })