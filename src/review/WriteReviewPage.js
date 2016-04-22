'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import WriteReviewList from './components/WriteReviewList';
import OrderReviewCancelButton from './components/OrderReviewCancelButton';
import {
  fetchWriteReviewList,
  changeStarRating,
  changeTextInputComment,
} from '../app/actions/WriteReviewActions';
import Mixpanel from '../util/mixpanel';
export default class WriteReviewPage extends React.Component {
    constructor(props) {
        super(props);
        props.dispatch(fetchWriteReviewList(this.props.orderIdx));
        this.state = {
            autoPopUp: props.autoPopUp,
            submit: false,
        };
    }

    componentWillUnmount() {
        const orderIdx = this.props.orderIdx;
        fetch(RequestURL.CANCEL_WRITE_REVIEW + 'order_idx=' + orderIdx)
            .then((response) => response.json())
            .then((responseData) => {
                const status = responseData.status;
                const description = responseData.description;
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
        Mixpanel.trackWithProperties('Review Worksheet', { submit: this.state.submit, autoPopUp: this.props.autoPopUp });
    }

    changeSubmitProperty() {
        this.setState({
            submit: true,
        })
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
                            onChangeSubmitProperty={ () => this.changeSubmitProperty() }
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