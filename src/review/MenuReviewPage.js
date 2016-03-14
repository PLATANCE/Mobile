'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import MenuReviewList from './components/MenuReviewList';

export default class ReviewPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <MenuReviewList reviews={this.props.reviews} />
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
});