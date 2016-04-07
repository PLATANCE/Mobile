'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import WriteReviewList from './components/WriteReviewList';
import {
  fetchWriteReviewList,
  changeStarRating,
  changeTextInputComment,
} from '../app/actions/WriteReviewActions';
export default class WriteReviewPage extends React.Component {
    constructor(props) {
        super(props);
        props.dispatch(fetchWriteReviewList(this.props.orderIdx));
    }

    render() {
        const {
            dispatch,
            reviews,
            orderIdx,
        } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <ScrollView>
                        <WriteReviewList 
                            reviews={reviews} 
                            orderIdx={orderIdx}
                            onFetchWriteReviewList={ () => dispatch(fetchWriteReviewList(orderIdx)) }
                            onChangeStarRating={ (orderDIdx, rating) => dispatch(changeStarRating(orderDIdx, rating)) }
                            onChangeTextInputComment={ (orderDIdx, rating) => dispatch(changeTextInputComment(orderDIdx, rating)) }
                        />
                    </ScrollView>
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