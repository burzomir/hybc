
import React, {Component} from "react";
import {View, AppRegistry} from "react-native";
import {Surface} from "gl-react-native";
import GL from "gl-react";
import triagnlemagic from './triagnlemagic';

export default class extends Component {
  render () {
    return <View>
      <Surface width={30} height={30}>
        <GL.Node
          shader={{
            frag: triagnlemagic
          }}
        />
      </Surface>
    </View>;
  }
}