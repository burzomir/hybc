import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';

const color = "#3ab9d6";

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
          <Text style={styles.text}>ADD NEW</Text>
          <Text style={styles.bigText}>friend</Text>
          <View style={styles.form}>
            <Text style={styles.label}>Type name</Text>
            <TextInput
              onChangeText={(e) => this.onUpdate(e)}
              value={this.state.value}
              style={styles.input}
              selectionColor={color}
              underlineColorAndroid="#333333"
            />
            <Button
              style={styles.button}
              onPress={() => console.log("błaton został naciśnięty")}
              title="ADD FRIEND"
              color={color}
              padding="20"
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
      backgroundColor: "#1b1f2e",
    },
    text: {
      marginTop: 30,
      fontSize: 22,
      textAlign: "center",
      color: "#ffffff",
      fontFamily: "Futura-Boo",
      marginBottom: 0
    },
    bigText: {
      fontFamily: "FuturaDisComD",
      marginTop: -10,
      fontSize: 80,
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
      fontSize: 26,
      color: "#ffffff",
      fontFamily: "Futura-Boo",
      backgroundColor: "#333333",
      paddingHorizontal: 8,
      paddingVertical: 13,
      borderColor: "#ff0000",
      marginBottom: 40,
    },
    label: {
      color: "#dddddd",
      fontSize: 20,
      fontFamily: "Futura-Boo",
    },
    button: {
      paddingVertical: 25,
      height: 160,
      textAlign: "center",
      color: "#ffffff"
    }
  })