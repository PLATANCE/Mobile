'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight } from 'react-native';
import DailyMenuList from './components/DailyMenuList';

export default class DailyMenuPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <DailyMenuList dailyMenus={this.props.dailyMenus} style={styles.listview}/>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    }
});