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
  AsyncStorage
} from 'react-native';
import Row from './Row';

const count_obj = (obj) => {
  let i = 0;
  for(let key in obj){
    if(obj.hasOwnProperty(key)) {
      i++;
    }
  }
  return i;
}


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: []
    }
  }
  componentWillMount() {
    AsyncStorage.getItem("items").then(json => {
      try {
        const all = JSON.parse(json);
        if(!all || count_obj(all) === 0) all = {};
        const array = [];
        for(var key in all) {
          if(all.hasOwnProperty(key)) {
              array.push({[key]: all[key]})
          }
      }
      console.log(array);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const tab = ds.cloneWithRows(array);
        this.setState({ all: tab });
      } catch(e) {
      }
    });
  }
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
            {this.state.all._cachedRowCount ? <ListView
              style={styles.list}
              enableEmptySections
              dataSource={this.state.all}
              renderRow={({ key, ...value }) => {
                return (
                  <Row
                    key={key}
                    value={{...value}}
                    navigation={this.props.navigation}
                  />
                )
              }}
            />: null}
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