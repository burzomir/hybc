import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import { login } from '../auth/actions';

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});

class LoginScreen extends React.Component {

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

const mapProps = ({ auth }) => ({ isLogging: auth.isLogging });
const mapDispatch = (dispatch) => ({
    onLogin({ username, password }) {
        dispatch(login(username, password));
    }
});

export default connect(mapProps, mapDispatch)(LoginScreen);