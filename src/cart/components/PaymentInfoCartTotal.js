'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Font, normalize } from '../../const/Font';
import { commaPrice } from '../../util/common';

export default class PaymentInfoCartTotal extends Component {
  props: {
    cart: Object;
  };
  
  render() {
    const {
      cart,
    } = this.props;
    
    let totalPrice = 0;
    for (const menuIdx in cart) {
      if (cart.hasOwnProperty(menuIdx)) {
        totalPrice += cart[menuIdx].altPrice * cart[menuIdx].amount;
      }
    }

    return (
      <View style={styles.container}>
        <Text style={Font.DEFAULT_FONT_BLACK}>합계</Text>
        <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{commaPrice(totalPrice, '원')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: normalize(16),
  },
  data: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 15,
  },
});
