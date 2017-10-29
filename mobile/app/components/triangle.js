
import React, {Component} from "react";
import {View, AppRegistry} from "react-native";
import Triangle from 'react-native-triangle';
import { rotation } from '../auth/actions';
import { connect } from 'react-redux';

var lastPotentials = [];
var mov = 1;
var dewiation = mov/5;
var initialPosition = lastPosition = {x:0, y:0, z:0};
class arrow extends Component {
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
    var potentials = this.getPotentialLocation(myPosition,distance);
    if (lastPotentials.length==0){
        lastPotentials = potentials;
    } else {
        lastPotentials =potentials.filter(this.filterfunc,lastPotentials );
    }
    callback(lastPotentials);
}

getHorizontalRotation(p2, p1){
  var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  return angleDeg;
}

  componentDidUpdate2(angle) {
    var now = Date.now();
    console.log("___comp update", angle);
    this.props.rotate(angle);
   // var diff = now - lastRendered;
   // lastRendered = now;
//var timeout = diff >= 16 ? 0 : 16 - diff;
    setTimeout(() => {
      this.forceUpdate();
    }, 16);
  }
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
  componentDidMount() {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     var initialPosition = JSON.stringify(position);
    //     console.log("initialPosition", initialPosition);
    //    // this.setState({initialPosition});
    //   },
    //   (error) => alert(error.message),
    //   {enableHighAccuracy: true, timeout: 3000, maximumAge: 1000}
    // );
    setInterval(()=>{

      lastPosition = {
        x: lastPosition.x + this.getRandomArbitrary(-5,5),
        y: lastPosition.y + this.getRandomArbitrary(-5,5),
        z:0
      }
    
   // this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log("gettedPosition");
      this.getBlueetothDestinationDistance((distance)=>{
        this.checkPosition(lastPosition, distance,(destpotentailpositions)=>{
          console.log("destpotentailpositions",destpotentailpositions);
          if (destpotentailpositions.length>0){
            var angledeg = this.getHorizontalRotation({x: destpotentailpositions[0].x, y: destpotentailpositions[0].y}, {x: lastPosition.x, y:lastPosition.y} );
            console.log("angledeg", angledeg)
            this.componentDidUpdate2(angledeg)
          }
        });
      });
    },2000);
   // });
    
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  getBlueetothDestinationDistance(callback){
    callback(5); //mock
  }
}
const mapDispatchToProps = (dispatch) => ({
  rotate(deg) {
    console.log("====--------=====", rotation(deg));
    dispatch(rotation(deg));
  }
})

export default connect(null, mapDispatchToProps)(arrow);