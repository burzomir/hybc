import React, { Component } from 'react';
import immutable from 'immutable';
import _ from "lodash";
import { BleManager } from 'react-native-ble-plx';

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
    }

    scan() {
        const results = [];

        this.bleManager.startDeviceScan(null, null, (_, device) => {
            results.push(device);
        });

        setTimeout(() => {
            this.bleManager.stopDeviceScan();
            const devices = immutable
                .List(results)
                .groupBy(device => device.id)
                .map(group => group.last())
                .sort((deviceA, deviceB) => deviceB.rssi - deviceA.rssi)
                .toArray();

            this.props.on({
                type: Scanner.actions.SCAN_RESULTS,
                payload: devices
            });

        }, 1000);
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


