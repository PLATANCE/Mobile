'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Font, normalize } from '../../const/Font';
import Color from '../../const/Color';
import Const from '../../const/Const';
import RequestURL from '../../const/RequestURL';
import { commaPrice } from '../../util/common';
import userInfo from '../../util/userInfo';
import Mixpanel from '../../util/mixpanel';

export default class CartOrderButton extends Component {
  props: {
    myInfo: Object;
    selectedTimeSlot: Object;
    cart: Object;
    selectedRecipient: string;
    pointWillUse: number;
    couponIdxWillUse: number;
    couponPriceWillUse: number;
  };
  
  showOrderInfo(enable, btnText) {
    const {
      myInfo,
      selectedTimeSlot,
      cart,
      selectedRecipient,
      pointWillUse,
      couponPriceWillUse,
      selectedPayMethod,
      isInstantDeliveryChecked,
      instantDeliveryEstimatedArrivalTime,
    } = this.props;
    
    const {
      mobile,
      address,
      addressDetail,
    } = myInfo;

    let mixpanelProperties = {};

    // menu total price
    let cartTotalPrice = 0;
    for (const menuIdx in cart) {
      if (cart.hasOwnProperty(menuIdx)) {
        cartTotalPrice += cart[menuIdx].altPrice * cart[menuIdx].amount;
      }
    }
    const recipient = (selectedRecipient === '본인') ? mobile : selectedRecipient;
    const discountPrice = pointWillUse + couponPriceWillUse;
    const totalPrice = cartTotalPrice - discountPrice;
    const deliveryTime = isInstantDeliveryChecked ? instantDeliveryEstimatedArrivalTime : selectedTimeSlot.timeSlot;
    if(enable) {
      mixpanelProperties = { success: true };
      Mixpanel.trackWithProperties('Place Order', mixpanelProperties);
      Alert.alert(
        '주문 요약',
        `배달 시간\n ${deliveryTime}\n\n배달 주소\n${address} ${addressDetail}` + 
        `\n\n받는 분 전화번호\n${recipient}` + 
        `\n\n총 결제 금액\n${commaPrice(totalPrice, '원')}`, 
        [
          {
            text: '취소',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          }, {
            text: '주문',
            onPress: () => this.submitPlaceOrder(totalPrice),
          },
        ]
      );
    } else {
      mixpanelProperties = { success: false, cause: btnText };
      Alert.alert(btnText);
      Mixpanel.trackWithProperties('Place Order', mixpanelProperties);
    }
  }

  submitPlaceOrder(totalPrice) {
    const {
      cart,
      selectedTimeSlot,
      pointWillUse,
      selectedPayMethod,
      couponIdxWillUse,
      couponPriceWillUse,
      selectedCutlery,
      selectedRecipient,
      myInfo,
      isInstantDeliveryChecked,
      onClearCartInfo,
      onClearCart,
      onFetchCartInfo,
    } = this.props;

    
    let menuDIdxParam = '';
    let menuAmountParam = '';

    // mixpanel properties
    let success = false;
    let countOfMenu = 0;
    let countOfMain = 0;
    let countOfSide = 0;
    let countOfBeverage = 0;

    // object for mixpanel properties
    let mixpanelProperties = {};
    
    for (const menuIdx in cart) {
      if (cart.hasOwnProperty(menuIdx)) {
        menuDIdxParam += `${cart[menuIdx].menuDIdx}|`
        menuAmountParam += `${cart[menuIdx].amount}|`;
        // countOfMain
        countOfMenu += cart[menuIdx].amount;
        // main
        if(cart[menuIdx].menuIdx >= 10 && cart[menuIdx].menuIdx <= 999) {
          countOfMain += cart[menuIdx].amount;
        }
        // side
        if(cart[menuIdx].menuIdx >= 20000 && cart[menuIdx].menuIdx <= 29999) {
          countOfSide += cart[menuIdx].amount;
        }
        // beverage
        if(cart[menuIdx].menuIdx >= 10000 && cart[menuIdx].menuIdx <= 19999) {
          countOfBeverage += cart[menuIdx].amount;
        }
      }
    }
    menuDIdxParam = menuDIdxParam.substring(0, menuDIdxParam.length - 1);
    menuAmountParam = menuAmountParam.substring(0, menuAmountParam.length - 1);

    const mobile = selectedRecipient === '본인' ? myInfo.mobile : selectedRecipient;

    let cartTotalPrice = 0;
    for (const menuIdx in cart) {
      if (cart.hasOwnProperty(menuIdx)) {
        cartTotalPrice += cart[menuIdx].altPrice * cart[menuIdx].amount;
      }
    }

    const time_slot = isInstantDeliveryChecked ? 999 : selectedTimeSlot.idx;

    const param = {
      user_idx: userInfo.idx,
      time_slot,
      total_price: totalPrice,
      menu_d_idx: menuDIdxParam,
      order_amount: menuAmountParam,
      point: pointWillUse,
      pay_method: selectedPayMethod,
      coupon_idx: couponIdxWillUse,
      include_cutlery: selectedCutlery,
      instant_delivery: isInstantDeliveryChecked,
      mobile,
      versionUpdated: true,
    };

    console.log(param);
    
    fetch(RequestURL.SUBMIT_PLACE_ORDER, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
    .then((response) => response.json())
    .then((responseData) => {
      const status = responseData.status;
      switch (status) {
        case 'fail_to_pay': {
          const description = responseData.description;
          Alert.alert('주문 실패', description);
          if(responseData.error) {
            const error = responseData.error;
            mixpanelProperties = { error: true, error_cause: error.toString() }
          } else {
            mixpanelProperties = { error: true, error_cause: description }
          }
        } break;
        case 'oos': {
          const outOfStockList = responseData.oos_list;
          let outOfStockMessage = '';
          outOfStockList.forEach((outOfStockMenu, index) => {
            outOfStockMessage += outOfStockMenu.split('.')[0];
            if (index !== outOfStockList.length - 1) {
              outOfStockMessage += '\n';
            }
          });
          Alert.alert('재고 부족', `아래 항목에 대한 재고가 부족합니다.\n\n${outOfStockMessage}`);
          mixpanelProperties = { error: true, error_cause: outOfStockMessage }
        } break;
        case 'done': {
          const orderIdx = responseData.order_idx;
          const description = responseData.description;
          onClearCart();
          Alert.alert('주문 성공', `${description}\n주문내역을 확인하세요 :)`, [
            {
              text: '주문 확인',
              onPress: () => {
                Actions.MyOrderPage();
              }
            },
          ]);
          onClearCartInfo();
          onFetchCartInfo(0);
          // mixpanel people property
          Mixpanel.increment('Purchase Count', 1);
          Mixpanel.increment('Total Purchase Amount', cartTotalPrice);
          Mixpanel.increment('Total Paid Amount', totalPrice);
          Mixpanel.increment('Discount Used', pointWillUse);
          mixpanelProperties = {
            error: false,
            totalPrice: cartTotalPrice,
            discount: pointWillUse + couponPriceWillUse,
            totalPaid: totalPrice,
            orderCount: countOfMenu,
            mainCount: countOfMain,
            sideCount: countOfSide,
            bevCount: countOfBeverage,
            timeSlot: selectedTimeSlot.idx,
            address: `${myInfo.address} ${myInfo.addressDetail}`,
          }; 
        } break;
        default:
          break;
      }
      Mixpanel.trackWithProperties('Confirm Order', mixpanelProperties);
    }).catch((error) => {
      console.warn(error);
      mixpanelProperties = { error: true, error_cause: error.toString() }
      Mixpanel.trackWithProperties('Confirm Order', mixpanelProperties);
    });
  }

  render() {
    const {
      myInfo,
      selectedTimeSlot,
      canOrder,
      cart,
      selectedPayMethod,
      cardNumber,
    } = this.props;
    
    const {
      mobile,
      address,
      deliveryAvailable
    } = myInfo;

    const isAddressValidated = address === Const.CART_ADDRESS_INPUT_MESSAGE ? false : true;
    const isMobileValidated = mobile === Const.CART_MOBILE_INPUT_MESSAGE ? false : true;
    const isCardNumberValidated = (selectedPayMethod === 1 && cardNumber === Const.CART_CARD_INPUT_MESSAGE) ? false : true;
    const isTimeSlotValidated = selectedTimeSlot.timeSlot === Const.CART_DELIVERY_TIME_CLOSED_MESSAGE ? false : true;
    const isDeliveryAvailableValidated = deliveryAvailable === 0 ? false : true;
    const isCanOrderValidated = canOrder === false ? false : true;
    
    let btnText;
    let btnStyle;
    let isBtnEnable = false;
    if(isAddressValidated && isMobileValidated && isTimeSlotValidated && isCardNumberValidated && isDeliveryAvailableValidated && isCanOrderValidated) {
      btnText = '주문하기';
      btnStyle = styles.buttonEnableStyle;
      isBtnEnable = true;
    } else {
      if(!isCanOrderValidated) {
        btnText = Const.CART_DELIVERY_TIME_CLOSED_MESSAGE;
      }
      if(!isDeliveryAvailableValidated) {
        btnText = Const.IS_NOT_SUPPORTED_AREA_MESSAGE;
      }
      if(!isTimeSlotValidated) {
        btnText = Const.CART_DELIVERY_TIME_CLOSED_MESSAGE;
      }
      if(!isCardNumberValidated) {
        btnText = Const.CART_CARD_INPUT_MESSAGE;
      }
      if(!isMobileValidated) {
        btnText = Const.CART_MOBILE_NEW_INPUT_MESSAGE;
      }
      if(!isAddressValidated) {
        btnText = Const.CART_ADDRESS_INPUT_MESSAGE;
      }
      btnStyle = styles.buttonDisableStyle;
    }
    
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={ () => this.showOrderInfo(isBtnEnable, btnText) }
      >
        <View style={[styles.container, btnStyle]}>
          <Text style={styles.text}>주문하기</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(20),
    marginLeft: normalize(16),
    marginRight: normalize(16),
  },
  text: {
    color: 'white',
    fontSize: normalize(17),
    fontWeight: 'bold',
  },
  buttonEnableStyle: {
    borderColor: Color.PRIMARY_ORANGE,
    backgroundColor: Color.PRIMARY_ORANGE,
  },
  buttonDisableStyle: {
    borderColor: Color.PRIMARY_GRAY_BUTTON,
    backgroundColor: Color.PRIMARY_GRAY_BUTTON,
  },
});
