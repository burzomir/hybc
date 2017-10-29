import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

class Row extends Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }
    onPress(page) {
        this.props.navigation.navigate(page);
    }
    render() {
        // const { complete } = this.props;
        // const textComponent = (
        //     <TouchableOpacity style={styles.textWrap} onLongPress={() => this.props.onToggleEdit(true)}>
        //         <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
        //     </TouchableOpacity>
        // );
        // const removeButton = (
        //     <TouchableOpacity onPress={this.props.onRemove}>
        //         <Text style={styles.destroy}>X</Text>
        //     </TouchableOpacity>
        // );

        // const doneButton = (
        //     <TouchableOpacity onPress={() => this.props.onToggleEdit(false)}>
        //         <Text>Save</Text>
        //     </TouchableOpacity>
        // )


        return (
            <View style={styles.container}>
                <Text style={styles.text}>Janusz</Text>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => this.onPress("Arrow")}>
                        <Image source={require('./assets/loop-icon.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPress("DeviceViews")}>
                        <Image source={require('./assets/plus-icon.png')} style={[styles.icon, styles.second]} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#333333",
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        fontSize: 24,
        fontFamily: "futura_bold",
        fontWeight: "bold",
        padding: 0,
        color: "#ffffff",
        width: 200
    },
    icon: {
        width: 40,
        height: 40
    },
    row: {
        flexDirection: "row",
    },
    second: {
        marginLeft: 5,
    }
});

export default Row;