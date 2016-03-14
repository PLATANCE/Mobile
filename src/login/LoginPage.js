'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';


export default class LoginPage extends React.Component {
    
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.img} />
                <View style={styles.ButtonBox} >
                </View>
                <View style={styles.policyBox}>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    img: {
        flex: 5.5,
        backgroundColor: 'orange',
        backgroundColor: 'red',
    },
    ButtonBox: {
        flex: 4.5,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    policyBox: {
        flex: 1,
        alignItems: 'center',
    },
    textOrange: {
        color: Color.PRIMARY_ORANGE,
        fontWeight: 'bold',
        fontSize: 15,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
        fontSize: 14,
    },
});
