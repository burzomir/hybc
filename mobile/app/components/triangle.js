
import React, {Component} from "react";
import {View, AppRegistry} from "react-native";
import Triangle from 'react-native-triangle';

export default class extends Component {
  render () {
    return  <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:40,
        marginBottom:40,        
      }}>
<Triangle
width={100}
height={70}
color={'#D80016'}
direction={'left'}
/>
    </View>;
  }
}