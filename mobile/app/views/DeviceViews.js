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
import _ from "lodash";
import Scanner from '../components/Scanner';
import NodesSocket from '../components/NodesSocket';

export default class DeviceVIews extends React.Component {
    static navigationOptions = ({ navigation }) => {

        const onPress = _.flow([
            () => _.defaultTo(navigation.state, {}),
            ({ params }) => _.defaultTo(params, {}),
            ({ search }) => _.defaultTo(search, () => { }),
        ])();

        return {
            title: 'Searching',
            headerRight: <Button title="Search" {...{ onPress }} />
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            devices: []
        }
    }

    search() {
        this.setState(prev => ({
            ...prev,
            isSearching: true,
            scannerAction: {
                type: Scanner.actions.SCAN
            }
        }));
    }

    setResults(results) {
        this.setState(prev => ({
            devices: results,
            isSearching: false,
            nodesSocketAction: {
                type: NodesSocket.actions.UPDATE_NODES,
                payload: results
            }
        }))
    }

    handleScannerAction(action) {
        switch (action.type) {
            case Scanner.actions.SCAN_RESULTS:
                return this.setResults(action.payload);
            default:
                return;
        }
    }

    handleNodesSocketAction(action) {
        switch (action.type) {
            case NodesSocket.actions.GO_TO_PATH:
                console.log(action.payload);
                return;
            default:
                this.setState(prev => ({...prev, nodesSocketAction: {
                    type: NodesSocket.actions.GO_TO,
                    payload: 0
                }}))
                return;
        }
    }

    finalise() {
        this.setState(prev => ({
            ...prev,
            isSubmitting: false,
            nodesSocketAction: {
                type: NodesSocket.actions.GO_TO,
                payload: prev.devices[0].id
            }
        }));
    }

    componentDidMount() {
        this.search();
        this.props.navigation.setParams({ search: this.search.bind(this) });
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
                <Scanner
                    action={this.state.scannerAction}
                    on={this.handleScannerAction.bind(this)}
                />
                <NodesSocket
                    baseUrl='hybc.jroslaniec.com'
                    action={this.state.nodesSocketAction}
                    on={this.handleNodesSocketAction.bind(this)}
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
        <Text>{item.name}</Text>
        <Text>{item.rssi}</Text>
    </View>
);

const keyExtractor = item => item.id;