import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ListView,
Keyboard,
} from 'react-native';
import Row from './Row';
import Triangle from '../components/triangle';

const arr = [
  {key: 1, value: 444},
  {key: 2, value: 444},
  {key: 3, value: 444},
  {key: 4, value: 444},
  {key: 5, value: 444},
];

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const tab = ds.cloneWithRows(arr);
export default class HomeScreen extends Component {
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
            <ListView
              style={styles.list}
              enableEmptySections
              dataSource={tab}
              renderRow={({ key, value }) => {
                return (
                  <Row
                    key={key}
                    value={value}
                    navigation={this.props.navigation}
                  />
                )
              }}
            />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1b1f2e"
  },
  list: {
    flex: 1
  },
  logo: {
    width: 286/2,
    height: 128/2,
    marginBottom: 50
  },
  listContainer: {
    flex: 1
  }
})







