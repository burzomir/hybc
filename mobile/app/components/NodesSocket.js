import React, { Component } from 'react';
import immutable from 'immutable';
import _ from "lodash";
import { WS } from '../myLib/ws';
import connect from '../myLib/connect';

export default class NodesSocket extends React.Component {

    static actions = {
        UPDATE_NODES: 'UPDATE_NODES',
        GO_TO: 'GO_TO',
        GO_TO_PATH: 'GO_TO_PATH'
    }

    componentDidMount() {
        const { baseUrl, token } = this.props;
        const deviceID = 0;
        const api = connect(baseUrl);
        api
            .login('test1', 'test1')
            .then(token => {
                const url = `wss://${baseUrl}/device/${deviceID}?token=${token}`;
                this.socket = new WS(url, this.handleMessage.bind(this));
            });

    }

    handleMessage(message) {
        return this.props.on(message);
    }

    updateNodes(nodes) {
        const data = {
            type: 'UPDATE_NODES',
            payload: nodes.map(node => ({
                from_device_id: 'mydevice_id',
                to_device_id: node.id,
                distance: node.rssi
            }))
        };
        this.socket.try_send(data);
    }

    goTo(node) {
        const data = {
            type: 'GO_TO',
            payload: node
        };
        this.socket.try_send(data);
    }

    componentWillReceiveProps({ action }) {
        if (this.props.action !== action) {
            switch (action.type) {
                case NodesSocket.actions.UPDATE_NODES:
                    return this.updateNodes(action.payload);
                case NodesSocket.actions.GO_TO:
                    return this.goTo(action.payload);
                default:
                    return;
            }
        }
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {
        return null;
    }
}


