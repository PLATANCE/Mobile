'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Toolbar from '../commonComponent/Toolbar';
import DailyMenuList from './components/DailyMenuList';
import Color from '../const/Color';

export default class DailyMenuPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Toolbar />
                <View style={styles.pageCommentBox}>
                    <Text style={styles.pageCommentText}>모든 메인메뉴는 전자렌지 조리용입니다.</Text>
                </View>
                <View style={styles.content}>
                    <DailyMenuList menus={this.props.menus} />
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    pageCommentBox: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
    },
    pageCommentText: {
        color: Color.PRIMARY_ORANGE,
    },
    content: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
    },
});