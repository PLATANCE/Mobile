'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import MyCouponList from './components/MyCouponList';

export default class MyCouponPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <MyCouponList coupons={this.props.coupons} />
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});