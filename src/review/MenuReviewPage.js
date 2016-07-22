'use strict';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  InteractionManager
} from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import MenuReviewList from './components/MenuReviewList';
import MenuReviewItem from './components/MenuReviewItem';
import PlaceholderView from '../commonComponent/PlaceholderView';

export default class ReviewPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      renderPlaceholderOnly: false,
      }
  }

  componentDidMount() {
    this.fetchReviewList();
  }

  fetchReviewList() {
    fetch(RequestURL.REQUEST_REVIEW_LIST + "?menu_idx=" + this.props.menuIdx)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        reviews: responseData.review,
      });
      InteractionManager.runAfterInteractions( () => {
        this.setState({
          renderPlaceholderOnly: true,
        });
      })
    })
    .catch((error) => {
      console.warn(error);
    })
  }

  renderPlaceholderView() {
    return (
      <PlaceholderView />
    );
  }

  render() {
    if(!this.state.renderPlaceholderOnly) {
      return this.renderPlaceholderView();
    }
    const {
      reviews,
    } = this.state;

    var reviewItems = reviews.map((review) => (
      <MenuReviewItem
        key={review.idx}
        review={review}
      />
    ));
    return (
      <View style={styles.container} >
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {reviewItems}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});