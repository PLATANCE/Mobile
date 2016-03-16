'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import FAQList from './components/FAQList';

export default class CSFAQPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.header}>
                        <Text style={[styles.textBlack, styles.textBold, {fontSize: 17}]}>FAQ</Text>
                    </View>
                    <FAQList questions={this.props.questions}/>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
        marginTop: Const.MARGIN_TOP,
    },
    content: {
        flex: 1,
    },
    header: {
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
    },
    textBold: {
        fontWeight: 'bold',
    }
});