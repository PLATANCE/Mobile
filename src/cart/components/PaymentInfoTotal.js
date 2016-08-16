'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Font, normalize } from '../../const/Font';
import { commaPrice } from '../../util/common';

export default class PaymentInfoTotal extends Component {
  props: {
    cart: Object;
    pointWillUse: number;
    couponPriceWillUse: number;
    deliveryFee: number;
  };
  
  render() {
    const {
      cart,
      pointWillUse,
      couponPriceWillUse,
      deliveryFee,
    } = this.props;
    
    // menu total price
    let cartTotalPrice = 0;
    for (const menuIdx in cart) {
      if (cart.hasOwnProperty(menuIdx)) {
        cartTotalPrice += cart[menuIdx].altPrice * cart[menuIdx].amount;
      }
    }

    const totalPrice = cartTotalPrice - pointWillUse - couponPriceWillUse - deliveryFee;
    return (
      <View style={styles.container}>
        <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>총 결제액</Text>
        <Text style={[styles.data, Font.DEFAULT_FONT_ORANGE_BOLD]}>{commaPrice(totalPrice, '원')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(16),
    backgroundColor: '#FFFAF5',
  },
  data: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 15,
  },
});
