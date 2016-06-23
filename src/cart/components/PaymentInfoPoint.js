'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AlertIOS, Alert } from 'react-native';
import { Font, normalize } from '../../const/Font';
import { commaPrice } from '../../util/common';

export default class PaymentInfoPoint extends Component {
  props: {
    myPoint: number;
    pointWillUse: number;
    cart: Object;
    couponPriceWillUse: number;
  };
  
  openAlertInputPoint() {
    const {
      myPoint,
      pointWillUse,
      cart,
      couponPriceWillUse,
      onSetPointWillUse,
    } = this.props;

    let cartTotalPrice = 0;
    for (const menuIdx in cart) {
      if (cart.hasOwnProperty(menuIdx)) {
        cartTotalPrice += cart[menuIdx].altPrice * cart[menuIdx].amount;
      }
    }

    AlertIOS.prompt('포인트 입력', '적용할 포인트를 입력해 주세요. ex)10000', [
      {
        text: '취소',
        onPress: () => console.log('포인트 취소 입력'),
        style: 'cancel',
      }, {
        text: '확인',
        onPress: (pointInput) => {
          pointInput = parseInt(pointInput);
          if((pointInput % 500) > 0) {
            Alert.alert('포인트 입력 오류', '포인트를 500원 단위로 입력해 주세요.');
            return;
          }
          if(pointInput > myPoint) {
            Alert.alert('포인트 입력 오류', '입력하신 금액이 보유한 금액보다 많습니다.');
            return;
          }
          const calculatedPoint = (cartTotalPrice - couponPriceWillUse - pointInput > 0) ? pointInput : cartTotalPrice - couponPriceWillUse;
          onSetPointWillUse(calculatedPoint);
        }
      },
    ]);
  }

  render() {
    const {
      myPoint,
      pointWillUse,
      onSetPointWillUse
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.openAlertInputPoint() }
      >
        <View style={styles.container}>
          <Text style={Font.DEFAULT_FONT_BLACK}>포인트 할인 <Text style={Font.DEFAULT_FONT_ORANGE}>({commaPrice(myPoint, 'p')} 보유)</Text></Text>
          <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{commaPrice(pointWillUse, '원')}</Text>
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
