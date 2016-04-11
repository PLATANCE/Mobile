'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import Font from '../const/Font';
import { Actions } from 'react-native-router-flux';

export default class CSMainPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <TouchableHighlight onPress={Actions.CSAddressCoveragePage} underlayColor={'transparent'}>
                        <View style={styles.row} >
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>배달 가능 지역</Text>
                            <Image style={styles.img}
                                source={require('../commonComponent/img/icon_input.png')}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={Actions.CSFAQPage} underlayColor={'transparent'}>
                        <View style={styles.row} >
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>FAQ</Text>
                            <Image style={styles.img}
                                source={require('../commonComponent/img/icon_input.png')}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={Actions.CSEnquiryPage} underlayColor={'transparent'}>
                        <View style={styles.row} >
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>문의하기</Text>
                            <Image style={styles.img}
                                source={require('../commonComponent/img/icon_input.png')}/>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={Actions.CSPolicyPage} underlayColor={'transparent'}>
                        <View style={styles.row} >
                            <Text style={[styles.textBlack, Font.DEFAULT_FONT_BLACK]}>이용약관</Text>
                            <Image style={styles.img}
                                source={require('../commonComponent/img/icon_input.png')}/>
                        </View>
                    </TouchableHighlight>
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
    row: {
        marginBottom: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50 * Const.DEVICE_RATIO,
        borderColor: Color.PRIMARY_GRAY,
        backgroundColor: 'white',
    },
    textBlack: {
        flex: 1,
    },
    img: {
        width: 10 * Const.DEVICE_RATIO,
        height: 10 * Const.DEVICE_RATIO,
    }
});