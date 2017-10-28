import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from 'react-native';

import LoginForm from '../components/LoginForm';

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});

export default class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    render() {

        const { onLogin, isLogging } = this.props;

        return (
            <View style={styles.container}>
                <LoginForm onSubmit={onLogin} />
                {
                    isLogging &&
                    <Text>
                        Logging in
                    </Text>
                }
            </View>
        );
    }
}