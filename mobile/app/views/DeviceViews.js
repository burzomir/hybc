import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
} from 'react-native';

import immutable from 'immutable';

import { BleManager } from 'react-native-ble-plx';

export default class DeviceVIews extends React.Component {
    static navigationOptions = {
        title: 'Searching',
    };

    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            isSearching: false
        }
    }

    componentDidMount() {
        const manager = new BleManager();
        const results = [];

        this.setState(prev => ({ ...prev, isSearching: true }));

        manager.startDeviceScan(null, null, (_, device) => {
            results.push(device);
        });

        setTimeout(() => {
            manager.stopDeviceScan();
            const devices = immutable
                .List(results)
                .groupBy(device => device.id)
                .map(group => group.last())
                .sort((deviceA, deviceB) => deviceB.rssi - deviceA.rssi)
                .toArray();
            this.setState(prev => ({ devices, isSearching: false }));
        }, 1000);
    }

    render() {
        return (
            <View>
                {
                    this.state.isSearching && <Text style={styles.container}>Searching...</Text>
                }
                <FlatList
                    data={this.state.devices}
                    {...{ renderItem, keyExtractor }}
                />
            </View >
        );
    }
}

const styles = {
    container: {
        padding: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
};

const renderItem = ({ item }) => (
    <View style={[styles.container, styles.item]}>
        <Text>{item.id}</Text>
        <Text>{item.rssi}</Text>
    </View>
);

const keyExtractor = item => item.id;