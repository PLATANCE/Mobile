'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Color from '../const/Color';
import ReviewList from './components/ReviewList';

export default class ReviewPage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <ReviewList reviews={this.props.reviews} />
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
    },
    content: {
        flex: 1,
    },
});