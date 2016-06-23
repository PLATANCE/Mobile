'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AlertIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Font, normalize } from '../../const/Font';
import { commaPrice } from '../../util/common';

export default class PaymentInfoCoupon extends Component {
  props: {
    couponPriceWillUse: number;
    myCouponCount: number;
  };

  render() {
    const {
      myCouponCount,
      couponPriceWillUse,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => Actions.MyCouponPage({ disable: true }) }
      >
        <View style={styles.container}>
          <Text style={Font.DEFAULT_FONT_BLACK}>쿠폰 할인 <Text style={Font.DEFAULT_FONT_ORANGE}>({myCouponCount}개 보유)</Text></Text>
          <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{commaPrice(couponPriceWillUse, '원')}</Text>
          <Image style={styles.iconDetailImage}
            source={require('../../commonComponent/img/icon_input.png')} 
          />
        </View>
      </TouchableOpacity>
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
    paddingRight: 5,
  },
  iconDetailImage: {
    width: 10,
    height: 10,
  }
});
