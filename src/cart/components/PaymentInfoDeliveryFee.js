'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Font, normalize } from '../../const/Font';
import { commaPrice } from '../../util/common';

export default class PaymentInfoDeliveryFee extends Component {
  props: {
    deliveryFee: number;
  };
  
  render() {
    const {
      deliveryFee,
    } = this.props;

    if(deliveryFee === 0) {
      return (
        <View style={styles.container}>
          <Text style={Font.DEFAULT_FONT_BLACK}>배달비</Text>
          <Text style={[styles.data, Font.DEFAULT_FONT_BLACK_BOLD]}>(이벤트) 무료</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={Font.DEFAULT_FONT_BLACK}>배달비</Text>
          <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{commaPrice(deliveryFee, '원')}</Text>
        </View>
      );  
    }
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
