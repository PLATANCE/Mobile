import React, {
  Component,
} from 'react';
import { View, ScrollView, StyleSheet, TouchableHighlight, Image, InteractionManager } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Const from '../const/Const';
import MyCouponItem from './components/MyCouponItem';
import { REQUEST_MY_COUPON_LIST } from '../const/RequestURL';
import PlaceholderView from '../commonComponent/PlaceholderView';
import {
  setCouponWillUse,
} from '../app/actions/CartInfoActions';
import {
  fetchCartInfo,
} from '../app/actions/CartInfoActions';
import userInfo from '../util/userInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 10,
    flex: 1,
  },
  img: {
    width: Const.WIDTH,
    height: Const.HEIGHT,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
});

export default class MyCouponPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coupons: [],
      hasData: false,
      renderPlaceholderOnly: false,
    };
  }
  componentDidMount() {
    this.fetchMyCoupons();
  }
  fetchMyCoupons() {
    const userIdx = userInfo.idx;
    fetch(`${REQUEST_MY_COUPON_LIST}user_idx=${userIdx}`)
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.length > 0) {
        this.setState({
          coupons: responseData,
          hasData: true,
        });
      }
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          renderPlaceholderOnly: true,
        });
      });
    })
    .catch((error) => {
      console.warn(error);
    });
  }
  loadingNoDataImage() {
    return (
      <TouchableHighlight onPress={Actions.ReferPage} underlayColor={'transparent'}>
        <View style={styles.container}>
          <Image style={styles.img}
            source={require('../order/img/no_coupon_data.png')} />
          </View>
        </TouchableHighlight>
    );
  }
  renderPlaceholderView() {
    return (
      <PlaceholderView />
    );
  }
  render() {
    const { props, state } = this;
    const {
      dispatch,
      cart,
      disable,
      pointWillUse,
    } = props;
    const { renderPlaceholderOnly, hasData, coupons } = state;

    if (!renderPlaceholderOnly) {
      return this.renderPlaceholderView();
    }
    if (!hasData) {
      return this.loadingNoDataImage();
    }
    const myCouponItem = coupons.map((coupon, key) => (
      <MyCouponItem
        coupon={coupon}
        key={key}
        cart={cart}
        disable={disable}
        pointWillUse={pointWillUse}
        onSetCouponWillUse={(couponIdxWillUse, couponPriceWillUse, pointWillUse) => dispatch(setCouponWillUse(couponIdxWillUse, couponPriceWillUse, pointWillUse))}
        fetchCartInfo={(couponIdxWillUse) => dispatch(fetchCartInfo(couponIdxWillUse))}
      />
    ));
    return (
      <View style={styles.container}>
        <View style={styles.content} >
          <ScrollView>
            {myCouponItem}
          </ScrollView>
        </View>
      </View>
    );
  }
}
