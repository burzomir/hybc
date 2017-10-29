import React, { Component } from 'react';
import immutable from 'immutable';
import _ from "lodash";
import { BleManager } from 'react-native-ble-plx';
import EasyBluetooth from 'easy-bluetooth-classic';

export default class Scanner extends React.Component {

    static actions = {
        SCAN: 'SCAN',
        SCAN_RESULTS: 'SCAN_RESULTS'
    };

    static scan() {
        return {
            type: Scanner.actions.SCAN
        }
    };

    constructor(props) {
        super(props);
        this.bleManager = new BleManager();
        var config = {
            "uuid": "00001101-0000-1000-8000-00805f9b34fb",
            "deviceName": "Bluetooth Example Project",
            "bufferSize": 1024,
            "characterDelimiter": "\n"
        }
        EasyBluetooth.addOnDeviceFoundListener((event) => {
            console.log(event);
        });
        EasyBluetooth.init(config);
    }

    scan() {
        EasyBluetooth.startScan()
            .then(results => {
                this.props.on({
                    type: Scanner.actions.SCAN_RESULTS,
                    payload: immutable
                        .List(results)
                        .map(device => ({ ...device, id: device.address }))
                        .groupBy(device => device.id)
                        .map(group => group.last())
                        .sort((deviceA, deviceB) => deviceB.rssi - deviceA.rssi)
                        .toArray()
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillUnmount() {
        this.bleManager.destroy();
    }

    componentWillReceiveProps({ action }) {
        if (this.props.action !== action) {
            switch (action.type) {
                case Scanner.actions.SCAN:
                    return this.scan();
                default:
                    return;
            }
        }
    }

    render() {
        return null;
    }
}


