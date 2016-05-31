'use strict';
import React, {
    Component,
} from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class TabView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>123</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
