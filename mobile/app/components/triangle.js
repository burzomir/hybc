
import React, {Component} from "react";
import {View, AppRegistry} from "react-native";
import {Surface} from "gl-react-native";
import GL from "gl-react";
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
import Triangle from './triangle';

export default class GLExample extends Component {
  render () {
    return <View>
      <Surface width={window.width} height={window.height}>
        <GL.Node
          shader={{
            frag: Triangle
          }}
        />
      </Surface>
    </View>;
  }
}