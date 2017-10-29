import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from 'react-native';



export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    submit() {
        this.props.onSubmit(this.state);
    }

    update(data) {
        this.setState(prev => ({ ...prev, ...data }));
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="Username"
                    onChangeText={username => this.update({ username })}
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={password => this.update({ password })}
                />
                <Button
                    title="Login"
                    onPress={() => this.submit()}
                />
            </View>
        );
    }
}

