'use strict';

import React, {
    Component,
    PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  Alert,
  AlertIOS,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';
import Picker from 'react-native-picker';
import { Actions } from 'react-native-router-flux';
import PageComment from '../commonComponent/PageComment';
import PlaceholderView from '../commonComponent/PlaceholderView';
import CartMenuList from './components/CartMenuList';
import CartItem from './components/CartItem';
import PaymentInfoCartTotal from './components/PaymentInfoCartTotal';
import PaymentInfoDeliveryFee from './components/PaymentInfoDeliveryFee';
import PaymentInfoPoint from './components/PaymentInfoPoint';
import PaymentInfoCoupon from './components/PaymentInfoCoupon';
import PaymentInfoTotal from './components/PaymentInfoTotal';
import DeliveryInfoDeliveryType from './components/DeliveryInfoDeliveryType';
import DeliveryInfoAddress from './components/DeliveryInfoAddress';
import DeliveryInfoDeliveryTime from './components/DeliveryInfoDeliveryTime';
import DeliveryInfoPaymentType from './components/DeliveryInfoPaymentType';
import DeliveryInfoCard from './components/DeliveryInfoCard';
import DeliveryInfoPayMethod from './components/DeliveryInfoPayMethod';
import DeliveryInfoMobile from './components/DeliveryInfoMobile';
import DeliveryInfoRecipient from './components/DeliveryInfoRecipient';
import DeliveryInfoCutlery from './components/DeliveryInfoCutlery';
import CartOrderButton from './components/CartOrderButton';
import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import RequestURL from '../const/RequestURL';
import {
  addItemToCart,
  decreaseItemFromCart,
  clearCart,
} from '../app/actions/CartActions';
import {
  fetchCartInfo,
  fetchMyCouponCount,
  setPointWillUse,
  clearCartInfo,
  setSelectedTimeSlot,
  setSelectedPayMethod,
  setSelectedRecipient,
  setSelectedCutlery,
  setDeliveryTypeCheck,
} from '../app/actions/CartInfoActions';
import Mixpanel from '../util/mixpanel';

const PAY_METHOD = {
  OFFLINE_CARD: '카드',
  OFFLINE_CASH: '현금',
};
const CUTLERY = {
  YES: '예',
  NO: '아니요',
};
const RECIPIENT = {
  SELF: '본인',
  OTHER: '아니요, 지인이 받습니다',
};
const PAY_METHOD_DATA = [
  PAY_METHOD.OFFLINE_CARD,
  PAY_METHOD.OFFLINE_CASH,
];
const CUTLERY_DATA = [
  CUTLERY.YES,
  CUTLERY.NO,
];
const RECIPIENT_DATA = [
  RECIPIENT.SELF,
  RECIPIENT.OTHER,
];


export default class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderPlaceholderOnly: false
    };
    props.dispatch(fetchCartInfo(props.couponIdx));
    props.dispatch(fetchMyCouponCount());
  }

  componentWillReceiveProps(nextProps) {
    // if cart length < 1, move to dailyMenu
    if (Object.keys(nextProps.cart).length === 0) {
      return Actions.pop();
    }
    
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholderOnly: true,
      })
    });
  }

  renderPlaceholderView() {
    return (
      <PlaceholderView />
    );
  }
  
  toggleDeliveryTime() {
    this.timeSlotPicker.toggle();
  }
  togglePayMethod() {
    this.payMethodPicker.toggle();
  }
  toggleCutlery() {
    this.cutleryPicker.toggle();
  }
  toggleRecipient() {
    this.recipientPicker.toggle();
  }

  autoHypenPhone(_str) {
    const str = _str.replace(/[^0-9]/g, '');
    let tmp = '';
    if (str.length < 4) {
      return str;
    } else if (str.length < 7) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3);
      return tmp;
    } else if (str.length < 11) {
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 3);
      tmp += '-';
      tmp += str.substr(6);
      return tmp;
    }
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 4);
    tmp += '-';
    tmp += str.substr(7);
    return tmp;
  }
  
  render() {
    // place holder
    if(!this.state.renderPlaceholderOnly) {
      return this.renderPlaceholderView();
    }
    const {
      dispatch,
      cart,
      deliveryFee,
      timeSlotData,
      myCouponCount,
      couponIdxWillUse,
      couponPriceWillUse,
      myInfo,
      cardNumber,
      canOrder,
      message,
      canImmediateDelivery,
      pointWillUse,
      selectedTimeSlot,
      selectedPayMethod,
      couponIdx,
      selectedRecipient,
      selectedCutlery,
      immediateDeliveryTime,
      isImmediateDeliveryChecked,
    } = this.props;

    const {
      deliveryAvailable,
      address,
      addressDetail,
      point,
      mobile,
    } = myInfo;
    
    var cartItems = Object.keys(cart).map((idx) => (
      <CartItem
        key={idx}
        item={cart[idx]}
        onAddItemToCart={(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable) => dispatch(addItemToCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable))}
        onDecreaseItemFromCart={(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng) => dispatch(decreaseItemFromCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng))}
      />
    ));

    let pickerDatas = [];
    timeSlotData.map((timeSlotData) => {
      pickerDatas.push(timeSlotData.timeSlot);
    });
    if(pickerDatas.length === 0) {
      pickerDatas.push(Const.CART_DELIVERY_TIME_CLOSED_MESSAGE);
    }

    const immediateDeliveryInfoType = canImmediateDelivery ? 
      <DeliveryInfoDeliveryType
        canImmediateDelivery={canImmediateDelivery}
        isImmediateDeliveryChecked={isImmediateDeliveryChecked}
        onSetDeliveryTypeCheck={ (isImmediateDeliveryChecked) => dispatch(setDeliveryTypeCheck(isImmediateDeliveryChecked))}
      />
      :
      false;

    const deliveryInfoCard = selectedPayMethod === 1 ? 
      <DeliveryInfoCard 
        cardNumber={cardNumber}
      />
      :
      false;
    const deliveryInfoPayMethod = selectedPayMethod === 1 ?
      false
      :
      <DeliveryInfoPayMethod
        onTogglePicker={ () => this.togglePayMethod() }
        selectedPayMethod={PAY_METHOD_DATA[selectedPayMethod - 2]}
      />;

    return (
      <View style={styles.container}>
        <PageComment text={'모든 메인메뉴는 전자렌지 조리용입니다.'}/>
        <ScrollView
          style={styles.scrollview}
          showsVerticalScrollIndicator={false} >
          <View style={styles.separatorWithMargin15} />
          {cartItems}
          <View style={styles.separatorWithMargin15} />
          <PaymentInfoCartTotal cart={cart} />
          <View style={styles.separatorWithMargin1} />
          <PaymentInfoDeliveryFee deliveryFee={deliveryFee} />
          <PaymentInfoPoint
            cart={cart}
            myPoint={point}
            couponPriceWillUse={couponPriceWillUse}
            pointWillUse={pointWillUse}
            onSetPointWillUse={(pointInput) => dispatch(setPointWillUse(pointInput))}
          />
          <PaymentInfoCoupon
            myCouponCount={myCouponCount}
            couponPriceWillUse={couponPriceWillUse}
            onSetPointWillUse={() => dispatch(setPointWillUse(point))}
          />
          <View style={styles.separatorWithMargin1} />
          <PaymentInfoTotal
            cart={cart}
            pointWillUse={pointWillUse}
            couponPriceWillUse={couponPriceWillUse}
          />
          <View style={styles.separatorWithMargin15} />

          {immediateDeliveryInfoType}

          <DeliveryInfoAddress
            address={address}
            addressDetail={addressDetail}
          />

          <DeliveryInfoDeliveryTime
            selectedTimeSlot={selectedTimeSlot}
            immediateDeliveryTime={immediateDeliveryTime}
            isImmediateDeliveryChecked={isImmediateDeliveryChecked}
            onTogglePicker={() => this.toggleDeliveryTime()}
          />
          
          <View style={styles.separatorWithMargin15} />

          <DeliveryInfoPaymentType
            selectedPayMethod={selectedPayMethod}
            onSelectPayMethod={(index) => dispatch(setSelectedPayMethod(index))}
          />
          
          {deliveryInfoCard}

          {deliveryInfoPayMethod}

          <DeliveryInfoMobile
            mobile={mobile}
            couponIdxWillUse={couponIdxWillUse}
          />
          <DeliveryInfoRecipient
            selectedRecipient={selectedRecipient}
            onTogglePicker={ () => this.toggleRecipient() }
          />
          <View style={styles.separatorWithMargin15} />
          <DeliveryInfoCutlery
            selectedCutlery={selectedCutlery}
            onTogglePicker={ () => this.toggleCutlery() }
          />
          <View style={styles.separatorWithMargin15} />
          <CartOrderButton
            cart={cart}
            myInfo={myInfo}
            selectedTimeSlot={selectedTimeSlot}
            canOrder={canOrder}
            selectedRecipient={selectedRecipient}
            pointWillUse={pointWillUse}
            couponIdxWillUse={couponIdxWillUse}
            couponPriceWillUse={couponPriceWillUse}
            selectedPayMethod={selectedPayMethod}
            cardNumber={cardNumber}
            selectedCutlery={selectedCutlery}
            onClearCartInfo={ () => dispatch(clearCartInfo()) }
            onClearCart={ () => dispatch(clearCart()) }
          />
          <Picker
            ref={(picker) => {this.timeSlotPicker = picker;}}
            style={styles.pickerStyle}
            pickerData={pickerDatas}
            selectedValue={pickerDatas[0]}
            onPickerDone={(selectedTimeSlot) => {
              dispatch(setSelectedTimeSlot(pickerDatas.indexOf(selectedTimeSlot[0], 0)));
            }}
          />
          <Picker
            ref={(picker) => {this.payMethodPicker = picker;}}
            style={styles.pickerStyle}
            pickerData={PAY_METHOD_DATA}
            selectedValue={PAY_METHOD_DATA[selectedPayMethod === 1 ? 0 : selectedPayMethod - 2]}
            onPickerDone={(pickedValue) => {
              const index = PAY_METHOD_DATA.indexOf(pickedValue[0], 0) + 2;
              dispatch(setSelectedPayMethod(index));
            }}
          />
          <Picker
            ref={(picker) => {this.cutleryPicker = picker;}}
            style={styles.pickerStyle}
            pickerData={CUTLERY_DATA}
            selectedValue={CUTLERY_DATA[selectedCutlery]}
            onPickerDone={(pickedValue) => {
              const index = CUTLERY_DATA.indexOf(pickedValue[0], 0)
              dispatch(setSelectedCutlery(index));
            }}
          />
          <Picker
            ref={(picker) => {this.recipientPicker = picker;}}
            style={styles.pickerStyle}
            pickerData={RECIPIENT_DATA}
            selectedValue={(selectedRecipient === '본인') ? RECIPIENT.SELF : RECIPIENT.OTHER}
            onPickerDone={(pickedValue) => {
              const index = RECIPIENT_DATA.indexOf(pickedValue[0], 0)
              if(index === 0) {
                dispatch(setSelectedRecipient(pickedValue[0]));
              } else {
                AlertIOS.prompt(
                  '지인 전화 번호',
                  '받는 분의 전화번호를 입력해주세요.(-제외)\n 예) 01012345678',
                  [
                    {
                      text: '취소',
                      onPress: () => Mixpanel.trackWithProperties('Enter Phone Number', { number: 'none' }),
                      style: 'cancel',
                    },
                    {
                      text: '확인',
                      onPress: (mobile) => dispatch(setSelectedRecipient(this.autoHypenPhone(mobile))),
                    },
                  ]
                );
              }
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollview: {
    flex: 1,
  },
  separatorWithMargin15: {
    marginTop: 15,
  },
  separatorWithMargin1: {
    marginTop: 1,
  },
  pickerStyle: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    height: 230,
    backgroundColor: Color.PRIMARY_BACKGROUND,
  }
});
