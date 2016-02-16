'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

export default class DailyMenuPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>DailyMenuPage page</Text>
            </View>
        );
    }
}