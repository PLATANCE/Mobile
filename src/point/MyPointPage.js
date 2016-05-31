'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';

export default class MyPointPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textOrange}>내 포인트</Text>
                <Text style={styles.textOrange}>{this.props.point}p</Text>
                <View style={styles.button} >
                    <Text style={styles.textWhite}>쿠폰 등록</Text>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderColor: Color.PRIMARY_ORANGE,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWhite: {
        color: 'white',
        fontSize: 15,
    },
    textOrange: {
        color: Color.PRIMARY_ORANGE,
        fontSize: 20,
    }

});