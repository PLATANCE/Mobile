'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import WriteReviewList from './components/WriteReviewList';

export default class WriteReviewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
        }
        console.log(this.props.orderIdx);
    }
    componentDidMount() {
        this.fetchWriteReviews();
    }
    fetchWriteReviews() {
        fetch(RequestURL.REQUEST_WRITE_REVIEW_LIST + 'order_idx=' + this.props.orderIdx)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    reviews: responseData.review_list,
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <ScrollView>
                        <WriteReviewList reviews={this.state.reviews} orderIdx={this.props.orderIdx}/>
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