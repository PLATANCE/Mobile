'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, ListView, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import WriteReviewList from './components/WriteReviewList';
import WriteReviewItem from './components/WriteReviewItem';
import OrderReviewCancelButton from './components/OrderReviewCancelButton';
import {
  fetchWriteReviewList,
  changeStarRating,
  changeTextInputComment,
} from '../app/actions/WriteReviewActions';
import Mixpanel from '../util/mixpanel';
import Swiper from 'react-native-swiper';
export default class WriteReviewPage extends Component {

  constructor(props) {
    super(props);
    props.dispatch(fetchWriteReviewList(this.props.orderIdx));
    this.state = {
      autoPopUp: props.autoPopUp,
      submit: false,
      width: 0,
      height: 0,
      scrollingTo: null,
      initialSelectedIndex: 0,
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
    
    Mixpanel.trackWithProperties('Review Worksheet', { submit: this.state.submit, autoPopUp: this.props.autoPopUp });
  }

  _onMomentumScrollEnd(e) {
    console.log(e);
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

    console.log(reviews);
    
    /*
    reviews.map((review, idx) => {
      console.log(review);
      console.log(idx);
    });
    */
    
    var writeReviewItems = reviews.map((review, index) => (
      <WriteReviewItem
        key={index}
        item={review}
        reviews={reviews}
        orderIdx={orderIdx}
        onFetchWriteReviewList={ () => dispatch(fetchWriteReviewList(orderIdx)) }
        onChangeStarRating={ (orderDIdx, rating) => dispatch(changeStarRating(orderDIdx, rating)) }
        onChangeTextInputComment={ (orderDIdx, rating) => dispatch(changeTextInputComment(orderDIdx, rating)) }
        onChangeSubmitProperty={ () => this.changeSubmitProperty() }
      />
    ));
    
    
    return (
      <View style={styles.container}>
          
        <ScrollView
          style={styles.scrollview}
          ref="scrollview"
          keyboardShouldPersistTaps={true}
          keyboardDismissMode={'on-drag'}
        >
          {writeReviewItems}
      {/*
          <WriteReviewList 
            reviews={reviews} 
            orderIdx={orderIdx}
            onFetchWriteReviewList={ () => dispatch(fetchWriteReviewList(orderIdx)) }
            onChangeStarRating={ (orderDIdx, rating) => dispatch(changeStarRating(orderDIdx, rating)) }
            onChangeTextInputComment={ (orderDIdx, rating) => dispatch(changeTextInputComment(orderDIdx, rating)) }
            onChangeSubmitProperty={ () => this.changeSubmitProperty() }
          />
      */}
        </ScrollView>
        
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollview: {
    flex: 1,
  },
});