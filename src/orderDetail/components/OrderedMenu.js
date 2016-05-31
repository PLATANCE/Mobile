'use strict';
import React, {
    Component,
} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Color from '../../const/Color';
import { Font } from '../../const/Font';

export default class OrderedMenu extends Component {
    static propTypes = {

    };

    render() {
        let {
            name,
            foreignName,
            amount,
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.menuBox}>
                    <View>
                        <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>{name}</Text>
                        <Text style={Font.DEFAULT_FONT_BLACK}>{foreignName}</Text>
                    </View>
                    <View style={styles.rightBox}>
                        <Text style={Font.DEFAULT_FONT_BLACK}>{amount}인분</Text>
                    </View>
                </View>
            </View>
        );

    }
}

/*
 * Style
 */
let styles = StyleSheet.create({
    container: { 
        backgroundColor: 'white',
        padding: 10,
    },
    menuBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBox: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});
