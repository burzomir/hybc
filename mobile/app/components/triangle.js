
import React, {Component} from "react";
import {View, AppRegistry} from "react-native";
import Triangle from 'react-native-triangle';

export default class extends Component {
  render () {
    return  <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        marginBottom:20,        
      }}>
<Triangle
width={140}
height={80}
color={'#D80016'}
direction={'left'}
/>
    </View>;
  }
}