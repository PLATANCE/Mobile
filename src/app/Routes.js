'use strict';
import React, { Component, AppRegistry, Navigator, StyleSheet, Text, View } from 'react-native';
import ReactNativeRouter, { Route, Schema, Animations, TabBar } from 'react-native-router-flux';

import { Provider, connect } from 'react-redux';
import { createStore } from 'redux'
import Reducers from './Reducers';

import DailyMenuPage from '../dailyMenu/DailyMenuPage';
import DailyMenuSelector from '../dailyMenu/DailyMenuSelector';

const Router = connect()(ReactNativeRouter.Router);
let store = createStore(Reducers);

export default class Routes extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router hideNavBar={true}>
                    <Route name="DailyMenuPage" component={connect(DailyMenuSelector)(DailyMenuPage)} initial={true} wrapRouter={true} title="DailyMenu"/>
                </Router>
            </Provider>
        );
    }
}
