
import React, {Component} from "react";
import {View, AppRegistry} from "react-native";
import Triangle from 'react-native-triangle';

var lastPotentials = [];
var mov = 1;
var dewiation = mov/5;

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
  getPotentialLocation(startPoint, length){
    var potentials = [];
    for (var x =startPoint.x-length; x<=length+startPoint.x; x+=mov){
        for (var y=startPoint.y-length; y<=length+startPoint.y; y+=mov){
            //for (var z=startPoint.z-length; z<=length+startPoint.z; z+=mov){
                var checkinglen =Math.hypot(x-startPoint.x,y-startPoint.y,/*z-startPoint.z*/ 0);
                if (checkinglen <= length + dewiation
                &&checkinglen >= length - dewiation){
                    potentials.push({
                        x:x,
                        y:y,
                        z:0
                    });
                }
            //}//z
        }
    }
    return potentials;
  }

  filterfunc(e,i,a){
    var findr = this.find(o => {
        return o.x >= e.x-dewiation && o.x <= e.x+dewiation 
        && o.y >= e.y-dewiation && o.y <= e.y+dewiation 
        //&& o.z >= e.z-dewiation && o.z <= e.z+dewiation
        });
        return findr;
  }

  checkPosition(myPosition, distance, callback){
    var potentials = getPotentialLocation(myPosition,distance);
    if (lastPotentials.length==0){
        lastPotentials = potentials;
    } else {
        lastPotentials =potentials.filter(filterfunc,lastPotentials );
    }
    callback(lastPotentials);
}

getHorizontalRotation(p2, p1){
  var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI
  return angleDeg;
}

  componentDidUpdate() {
    var now = Date.now();
    var diff = now - lastRendered;
    lastRendered = now;
    var timeout = diff >= 16 ? 0 : 16 - diff;
    setTimeout(() => {
      this.forceUpdate();
    }, timeout);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 3000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log("gettedPosition");
      getBlueetothDestinationDistance((distance)=>{
        checkPosition(position, distance,(destpotentailpositions)=>{
          console.log("destpotentailpositions",destpotentailpositions);
          if (destpotentailpositions.length>0){
            var angledeg = getHorizontalRotation({x: destpotentailpositions[0].x, y: destpotentailpositions[0].y}, {x: position.x, y:position.y} );
            console.log("angledeg", angledeg)
            this.componentDidUpdate(angledeg)
          }
        });
      });
      
    });
    
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  getBlueetothDestinationDistance(callback){
    callback(5); //mock
  }
}