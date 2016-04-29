'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import AddressCoverageList from './components/AddressCoverageList';

export default class CSMainPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.header}>
                        <Text style={[Font.DEFAULT_FONT_BLACK_BOLD, {fontSize: normalize(17)}]}>배달 가능 지역</Text>
                    </View>
                    <AddressCoverageList addressCoverages={this.props.addressCoverages}/>
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
        height: normalize(50),
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: normalize(16),
    },
});