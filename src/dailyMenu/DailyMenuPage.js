'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight } from 'react-native';
import DailyMenuList from './components/DailyMenuList';

export default class DailyMenuPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>모든 메인 메뉴는 당일 조리, 당일 배송 됩니다.</Text>
                <DailyMenuList menus={this.props.menus} />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    }
});