import React, {
  Component,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { normalize } from '../../const/Font';
import Const from '../../const/Const';
import MediaURL from '../../const/MediaURL';
import RequestURL from '../../const/RequestURL';
import Mixpanel from '../../util/mixpanel';
import userInfo from '../../util/userInfo';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    marginBottom: 10,
  },
  img: {
    width: Const.WIDTH,
    height: normalize(175),
    resizeMode: 'contain',
  },
});
export default class MyCouponItem extends Component {
  fetchCouponAvailble(idx) {
    const {
      cart,
      pointWillUse,
      couponIdxWillUse,
      couponPriceWillUse,
      fetchCartInfo,
      onSetCouponWillUse,
      disable,
    } = this.props;

    let cartTotalPrice = 0;
    for (const menuIdx in cart) {
      if (cart.hasOwnProperty(menuIdx)) {
        cartTotalPrice += cart[menuIdx].altPrice * cart[menuIdx].amount;
      }
    }

    if (disable) {
      Mixpanel.trackWithProperties('Choose Coupon', { couponIdx: idx });
      let cart = this.props.cart;
      let menuIdxParam = '';
      let menuAmountParam = '';
      for(let menuIdx in cart) {
        menuIdxParam += cart[menuIdx].menuIdx + '|';
        menuAmountParam += cart[menuIdx].amount + '|';
      }
      menuIdxParam = menuIdxParam.substring(0, menuIdxParam.length - 1);
      menuAmountParam = menuAmountParam.substring(0, menuAmountParam.length - 1);

      const param = {
        user_idx: userInfo.idx,
        coupon_idx: idx,
        menu_idx: menuIdxParam,
        menu_amount: menuAmountParam,
      };
      fetch(RequestURL.REQUEST_COUPON_AVAILABLE, {
        method: 'POST',
        headers: {
          'Accept': 'applcation/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param)
      })
      .then((response) => response.json())
      .then((responseData) => {
        let available = responseData.available;
        let couponIdx = responseData.coupon_idx;
        let discountCouponPrice = responseData.sale_price;
        let message = responseData.msg;

        if (available) {
          Alert.alert(
            '쿠폰 사용',
            message,
            [
              { text: '확인', onPress: () => {
                  const pointInput = discountCouponPrice + pointWillUse > cartTotalPrice ? (cartTotalPrice - discountCouponPrice) : pointWillUse;
                  fetchCartInfo(couponIdx);
                  onSetCouponWillUse(couponIdx, discountCouponPrice, pointInput);
                  Actions.pop();
                },
              },
            ]
          );
        } else {
          Alert.alert(
            '쿠폰 사용 불가',
            message,
            [{ text: '확인', onPress: () => Actions.pop() }]
          );
        }
      })
      .catch((error) => {
        console.warn(error);
      });
    }
  }

  render() {
    const { coupon } = this.props;
    const { idx, image_url_coupon } = coupon;
    const imageURL = MediaURL.COUPON_URL + image_url_coupon;

    return (
      <TouchableHighlight underlayColor={'transparent'}
        onPress={() => this.fetchCouponAvailble(idx)}
      >
        <View style={styles.row} >
          <Image style={styles.img}
            source={{ uri: imageURL }}
          />
        </View>
      </TouchableHighlight>
    );
  }
}
