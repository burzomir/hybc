/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import HomeScreen from './app/views/HomeScreen';
import DeviceVIews from './app/views/DeviceViews';
import ArrowScreen from './app/views/ArrowViews';
//import LoginScreen from './app/views/LoginScreen';
import { StackNavigator } from 'react-navigation';
import connector from './app/lib/connect';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './app/auth/reducers';

const store = createStore(
  combineReducers({
    auth: authReducer
  }),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);


const App_ = StackNavigator({
  // Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  DeviceVIews: { screen: DeviceVIews },
  Arrow: { screen: ArrowScreen },
}, {
  headerMode: "none",
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App_ />
      </Provider>
    );
  }
}

