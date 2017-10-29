import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';

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
      return (
        <View style={styles.container}>
          <Text style={styles.text}>add new</Text>
          <Text style={styles.bigText}>friend</Text>
          <View style={styles.form}>
            <Text style={styles.label}>Type name</Text>
            <TextInput
              onChangeText={(e) => this.onUpdate(e)}
              autoFocus
              value={this.state.value}
              style={styles.input}
            />
            <Button
              style={styles.button}
              onPress={() => console.log("błaton został naciśnięty")}
              title="ADD FRIEND"
            ></Button>
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
      fontSize: 14,
      textAlign: "center",
      color: "#ffffff",
    },
    bigText: {
      marginTop: 10,
      fontSize: 30,
      textAlign: "center",
      color: "#ffffff",
    },
    form: {
      flex: 1,
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "center",
    },
    input: {
      marginTop: 10,
      fontSize: 24,
      color: "#ffffff",
    },
    label: {
      color: "#dddddd",
      fontSize: 12
    },
    button: {
      paddingVertical: 25,
      height: 160,
      textAlign: "center",
      backgroundColor: "#3ab9d6",
      color: "#ffffff"
    }
  })