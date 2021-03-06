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
  getAvailablePoint,
  clearCartInfo,
} from '../app/actions/CartInfoActions';


import userInfo from '../util/userInfo';
import Mixpanel from '../util/mixpanel';

const PAY_METHOD = {
  ONLINE_CARD: '카드',
  OFFLINE_CARD: '현장카드',
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
const PICKER_PAY_METHOD_DATA = [
  PAY_METHOD.ONLINE_CARD,
  PAY_METHOD.OFFLINE_CARD,
  PAY_METHOD.OFFLINE_CASH,
];
const PICKER_CUTLERY_DATA = [
  CUTLERY.YES,
  CUTLERY.NO,
];
const PICKER_RECIPIENT_DATA = [
  RECIPIENT.SELF,
  RECIPIENT.OTHER,
];

export default class CartPage extends Component {
  constructor(props) {
    super(props);
    const timeSlotPickerData = this.generateTimeSlotPickerData(props.timeSlotData);
    const selectedTimeSlot = '';
    this.state = {
      timeSlotPickerData,
      selectedTimeSlot,
      selectedCutlery: CUTLERY.YES,
      selectedCutleryParam: 1,
      selectedPayMethod: PAY_METHOD.ONLINE_CARD,
      selectedPayMethodParam: 1,
      selectedRecipient: RECIPIENT.SELF,
      totalPrice: 0,
      renderPlaceholderOnly: false,
      cntCoupon: 0,
    };
    this.props.dispatch(fetchCartInfo(props.couponIdx));
  }

  componentDidMount() {
    this.fetchMyCoupon();
  }

  fetchMyCoupon() {
    const userIdx = userInfo.idx;
    fetch(RequestURL.REQUEST_MY_COUPON_LIST + 'user_idx=' + userIdx)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        cntCoupon: responseData.length,
      });
    })
    .catch((error)=> {
      console.warn(error);
    })
    .done();
  }

  componentWillReceiveProps(nextProps) {
    // if cart length < 1, move to dailyMenu
    if (Object.keys(nextProps.cart).length === 0) {
      return Actions.pop();
    }
    
    const timeSlotPickerData = this.generateTimeSlotPickerData(nextProps.timeSlotData);

    let selectedTimeSlot;
    if(timeSlotPickerData.length) {
      // init
      if(this.state.selectedTimeSlot == '') {
        selectedTimeSlot = timeSlotPickerData[0];
      } else {
        for(var i = 0; i < timeSlotPickerData.length; i++) {
          if(this.state.selectedTimeSlot === Const.CART_DELIVERY_TIME_CLOSED_MESSAGE) {
            selectedTimeSlot = timeSlotPickerData[0];
          }
          if(timeSlotPickerData[i] == this.state.selectedTimeSlot) {
            selectedTimeSlot = timeSlotPickerData[i];
          }
        }
      }
    } else {
      selectedTimeSlot = Const.CART_DELIVERY_TIME_CLOSED_MESSAGE;
    }
  
    this.setState({
      timeSlotPickerData,
      selectedTimeSlot,
    });
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        renderPlaceholderOnly: true,
      })
    });
    this.mixpanelCartInfo(nextProps.myInfo, nextProps.cardNumber);
  }

  mixpanelCartInfo(myInfo, cardNumber) {
    const address = (myInfo.address === Const.CART_ADDRESS_INPUT_MESSAGE)
      ? false
      : true;
    const coverage = (myInfo.deliveryAvailable != 1)
      ? false
      : true;
    const phoneNumber = (myInfo.mobile === Const.CART_MOBILE_INPUT_MESSAGE)
      ? false
      : true;
    const creditCard = (cardNumber === Const.CART_CARD_INPUT_MESSAGE)
      ? false
      : true;
    Mixpanel.trackWithProperties('(Screen) Cart', { address, coverage, phoneNumber, creditCard })
  }

  generateTimeSlotPickerData(timeSlotData) {
    const returnData = [];

    timeSlotData.forEach((datum) => {
      returnData.push(datum.timeSlot);
    });

    return returnData;
  }

  setPayMethod(selectedItem) {
    const selectedPayMethod = selectedItem[0]
    let selectedPayMethodParam;
    if (selectedPayMethod === PAY_METHOD.ONLINE_CARD) {
      Mixpanel.trackWithProperties('Choose Payment Type', { selected: 'credit card' });
      selectedPayMethodParam = 1;
    } else if (selectedPayMethod === PAY_METHOD.OFFLINE_CARD) {
      Mixpanel.trackWithProperties('Choose Payment Type', { selected: 'card on-site' });
      selectedPayMethodParam = 2;
    } else if (selectedPayMethod === PAY_METHOD.OFFLINE_CASH) {
      Mixpanel.trackWithProperties('Choose Payment Type', { selected: 'cash' });
      selectedPayMethodParam = 3;
    }
    this.setState({
      selectedPayMethod,
      selectedPayMethodParam,
    });
  }

  setCutlery(selectedItem) {
    const selectedCutlery = selectedItem[0]
    let selectedCutleryParam;
    if (selectedCutlery === CUTLERY.YES) {
      Mixpanel.trackWithProperties('Choose Cutlery', { selected: 'yes' });
      selectedCutleryParam = 1;
    } else if(selectedCutlery === CUTLERY.NO){
      Mixpanel.trackWithProperties('Choose Cutlery', { selected: 'no' });
      selectedCutleryParam = 0;
    }
    this.setState({
      selectedCutlery,
      selectedCutleryParam,
    });
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

  openAlertMobile() {
    AlertIOS.prompt('지인 전화 번호', '받는 분의 전화번호를 입력해주세요.(-제외)\n 예) 01012345678', [
      {
        text: '취소',
        onPress: () => Mixpanel.trackWithProperties('Enter Phone Number', { number: 'none' }),
        style: 'cancel',
      }, {
        text: '확인',
        onPress: (mobile) => this.setState({
          selectedRecipient: this.autoHypenPhone(mobile),
        }),
      },
    ]);
  }

  setRecipient(selectedItem) {
    console.log(selectedItem);
    const selectedRecipient = selectedItem[0]
    if (selectedRecipient === RECIPIENT.SELF) {
      Mixpanel.trackWithProperties('Choose Recipient', { selected: 'self' });
      this.setState({
        selectedRecipient: RECIPIENT.SELF
      });
    } else if(selectedRecipient === RECIPIENT.OTHER){
      Mixpanel.trackWithProperties('Choose Recipient', { selected: 'other' });
      this.openAlertMobile();
    }
  }

  openPickerDeliveryTime() {
    this.timeSlotPicker.toggle();
  }
  openPickerPayMethod() {
    this.payMethodPicker.toggle();
  }
  openPickerCutlery() {
    this.cutleryPicker.toggle();
  }
  openPickerRecipient() {
    this.recipientPicker.toggle();
  }

  openAlertInputPoint() {
    AlertIOS.prompt('포인트 입력', '적용할 포인트를 입력해 주세요. ex)10000', [
      {
        text: '취소',
        onPress: () => console.log('포인트 취소 입력'),
        style: 'cancel',
      }, {
        text: '확인',
        onPress: (pointInput) => this.setAvailablePoint(pointInput),
      },
    ]);
  }

  setAvailablePoint(pointInput) {

    this.props.dispatch(getAvailablePoint(parseInt(pointInput)));
  }

  commaPrice(price, suffix) {
    const priceString = String(price);
    const commaedPrice = priceString.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    return `${commaedPrice}${suffix}`;
  }

  //this.openAlertToConfirmOrder(cart, totalPrice, availablePoint, couponIdx, menuTotalPrice, discountCouponPrice, this.state.selectedTimeSlot, addressInfo, enableOrderButton)}
  openAlertToConfirmOrder(cart, totalPrice, availablePoint, couponIdx, menuTotalPrice, discountCouponPrice, selectedTimeSlot, addressInfo, enableOrderButton, orderButtonText) {
    //console.log(cart, totalPrice, availablePoint, couponIdx, enableOrderButton);
    if (enableOrderButton) {
      const selectedTimeSlot = this.state.selectedTimeSlot;
      const myInfo = this.props.myInfo;
      console.log(this.props.myInfo.mobile);
      const recipient = (this.state.selectedRecipient === '본인') ? this.props.myInfo.mobile : this.state.selectedRecipient;

      Alert.alert('주문 요약',
      `배달 시간\n ${selectedTimeSlot}\n\n배달 주소\n${addressInfo}` +
      `\n\n받는 분 전화번호\n${recipient}` + 
      `\n\n최종 결제 금액\n${this.commaPrice(totalPrice, '원')}`, [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        }, {
          text: '주문',
          onPress: () => this.submitPlaceOrder(cart, totalPrice, availablePoint, couponIdx, menuTotalPrice, discountCouponPrice, selectedTimeSlot, addressInfo, recipient),
        },
      ]);
    } else {
      Alert.alert(orderButtonText);
    }
  }

  getSelectedTimeSlotIdx() {
    const {
      timeSlotData,
    } = this.props;

    const {
      selectedTimeSlot,
    } = this.state;
    //console.log(selectedTimeSlot);
    let selectedTimeSlotIdx;
    timeSlotData.forEach(timeSlotDatum => {
      const {
        timeSlot,
        idx,
      } = timeSlotDatum;
      //console.log(timeSlotDatum);
      if (selectedTimeSlot === timeSlot) {
        selectedTimeSlotIdx = idx;
      }
    });
    //console.log(selectedTimeSlotIdx);
    return selectedTimeSlotIdx;
  }

  // this.submitPlaceOrder(cart, totalPrice, availablePoint, couponIdx, menuTotalPrice, discountCouponPrice, selectedTimeSlot, addressInfo),
  submitPlaceOrder(cart, totalPrice, point, couponIdx, menuTotalPrice, discountCouponPrice, selectedTimeSlot, addressInfo, recipient) {
    let menuDIdxParam = '';
    let menuAmountParam = '';

    // mixpanel properties
    let success = false;
    const discount = totalPrice + discountCouponPrice;
    let countOfMenu = 0;
    let countOfMain = 0;
    let countOfSide = 0;
    let countOfBeverage = 0;
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
    const param = {
      user_idx: userInfo.idx,
      time_slot: this.getSelectedTimeSlotIdx(),
      total_price: totalPrice,
      menu_d_idx: menuDIdxParam,
      order_amount: menuAmountParam,
      point,
      pay_method: this.state.selectedPayMethodParam,
      coupon_idx: couponIdx,
      include_cutlery: this.state.selectedCutleryParam,
      mobile: recipient,
    };
    
    fetch(RequestURL.SUBMIT_PLACE_ORDER, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    }).then((response) => response.json()).then((responseData) => {
      const status = responseData.status;
      switch (status) {
        case 'fail_to_pay': {
          const description = responseData.description;
          Alert.alert('주문 실패', description);
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
          Mixpanel.increment('Purchase Count', 1);
        } break;
        case 'done': {
          const orderIdx = responseData.order_idx;
          const description = responseData.description;
          this.props.dispatch(clearCart());
          success = true;
          Alert.alert('주문 성공', `${description}\n주문내역을 확인하세요 :)`, [
            {
              text: '주문 확인',
              onPress: () => {
                Actions.MyOrderPage();
              }
            },
          ]);
          this.props.dispatch(clearCartInfo());
          // mixpanel people property
          Mixpanel.increment('Purchase Count', 1);
          Mixpanel.increment('Total Purchase Amount', menuTotalPrice);
          Mixpanel.increment('Total Paid Amount', totalPrice);
          Mixpanel.increment('Discount Used', point);
        } break;
        default:
          break;
      }
      Mixpanel.trackWithProperties('Confirm Order', {
        success,
        totalPrice: menuTotalPrice,
        discount,
        totalPaid: totalPrice,
        orderCount: countOfMenu,
        mainCount: countOfMain,
        sideCount: countOfSide,
        bevCount: countOfBeverage,
        timeSlot: selectedTimeSlot,
        address: addressInfo,
      })
    }).catch((error) => {
      console.warn(error);
    });
  }

  
  renderPlaceholderView() {
    return (
      <PlaceholderView />
    );
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
      couponIdx,
      discountCouponPrice,
      myInfo,
      cardNumber,
      canOrder,
      message,
      instantDeliveryAvailable,
    } = this.props;
    let {
      availablePoint,
    } = this.props;

    const {
      deliveryAvailable,
      address,
      addressDetail,
      point,
    } = myInfo;

    let {
      mobile
    } = myInfo;

    const {
      selectedPayMethod,
      selectedPayMethodParam,
      selectedTimeSlot,
    } = this.state;


    let totalPrice = 0;

    // orage text or black text when properyly input
    const addressHighlight = (address === Const.CART_ADDRESS_INPUT_MESSAGE)
      ? Font.DEFAULT_FONT_ORANGE
      : Font.DEFAULT_FONT_BLACK;
    const addressInfo = (address === Const.CART_ADDRESS_INPUT_MESSAGE)
      ? Const.CART_ADDRESS_INPUT_MESSAGE
      : address + ' ' + addressDetail;
    const mobileHighlight = (mobile === Const.CART_MOBILE_INPUT_MESSAGE)
      ? Font.DEFAULT_FONT_ORANGE
      : Font.DEFAULT_FONT_BLACK;
    const cardHighlight = (cardNumber === Const.CART_CARD_INPUT_MESSAGE)
      ? Font.DEFAULT_FONT_ORANGE
      : Font.DEFAULT_FONT_BLACK;
      

    // card layout visible
    let cardLayout = false;
    
    if (selectedPayMethod === PAY_METHOD.ONLINE_CARD) {
      cardLayout = <TouchableHighlight 
          underlayColor={'transparent'} 
          onPress={ () => Actions.AddCardPage() }
          >
        <View style={styles.row}>
          <Text style={styles.textBlack}>카드</Text>
          <Text style={[styles.data, cardHighlight]}>{cardNumber}</Text>
          <View>
            <Image style={styles.iconDetailImage} source={require('../commonComponent/img/icon_input.png')} />
          </View>
        </View>
      </TouchableHighlight>;
    }

    // message layout visible or invisible
    let messageLayout = false;
    let orderBtnMarginTopStyle = styles.orderBtnMarginTopStyleNon;
    if (!canOrder) {
      messageLayout = <View style={styles.otherInfoBox}>
                        <Text style={Font.DEFAULT_FONT_ORANGE}>{message}</Text>
                      </View>
      orderBtnMarginTopStyle = styles.orderBtnMarginTopStyle;
    }
    
    // menu total price
    let menuTotalPrice = 0;
    for (const menuIdx in cart) {
      if (cart.hasOwnProperty(menuIdx)) {
        menuTotalPrice += cart[menuIdx].altPrice * cart[menuIdx].amount;
      }
    }

    // setAvailablePointoint
    if (discountCouponPrice) {
      if (availablePoint >= menuTotalPrice + deliveryFee - discountCouponPrice) {
        availablePoint = menuTotalPrice + deliveryFee - discountCouponPrice;
      }
    } else {
      if (availablePoint >= menuTotalPrice + deliveryFee) {
        availablePoint = menuTotalPrice + deliveryFee;
      }
    }
    const displayAvailablePoint = ((availablePoint == 0) ? '' : '-') + this.commaPrice(availablePoint, '원');

    // deliveryFee
    let displayDeliveryFee = (deliveryFee == 0) ? '(이벤트) 무료' : '+' + this.commaPrice(deliveryFee, '원');
    
    // discountCouponPrice
    let displayDiscountCouponPrice = ((discountCouponPrice == 0) ? '' : '-') + this.commaPrice(discountCouponPrice, '원');

    // totalPrice
    totalPrice = menuTotalPrice + deliveryFee - availablePoint - discountCouponPrice;


    // instant delivery
    const instantCheckedStyle = (instantDeliveryAvailable) ? styles.checkedBtnStyle : styles.unCheckedBtnStyle;
    const instantUnCheckedStyle = (instantDeliveryAvailable) ? styles.unCheckedBtnStyle : styles.checkedBtnStyle;
    const instantCheckedTextStyle = (instantDeliveryAvailable) ? Font.DEFAULT_FONT_WHITE : Font.DEFAULT_FONT_ORANGE;
    const instantUnCheckedTextStyle = (instantDeliveryAvailable) ? Font.DEFAULT_FONT_ORANGE : Font.DEFAULT_FONT_WHITE;

    // enable order button with background color
    let enableOrderButton = true;
    let enableOrderButtonText = '주문하기';
    if (address === Const.CART_ADDRESS_INPUT_MESSAGE) {
      enableOrderButton = false;
      enableOrderButtonText = Const.CART_ADDRESS_INPUT_MESSAGE;
    }
    if (mobile === Const.CART_MOBILE_INPUT_MESSAGE) {
      enableOrderButton = false;
      enableOrderButtonText = Const.CART_MOBILE_NEW_INPUT_MESSAGE;
      mobile = Const.CART_MOBILE_NEW_INPUT_MESSAGE;
    }
    if (selectedTimeSlot === Const.CART_DELIVERY_TIME_CLOSED_MESSAGE) {
      enableOrderButton = false;
      enableOrderButtonText = Const.CART_DELIVERY_TIME_CLOSED_MESSAGE;
    }
    if (deliveryAvailable == 0) {
      enableOrderButton = false;
      enableOrderButtonText = '배달 지역이 아닙니다.';
    }
    if (selectedPayMethodParam === 1) {
      if (cardNumber === Const.CART_CARD_INPUT_MESSAGE) {
        enableOrderButton = false;
        enableOrderButtonText = Const.CART_CARD_INPUT_MESSAGE;
      }
    }
    if(!canOrder) {
      enableOrderButton = false;
      enableOrderButtonText = Const.CART_DELIVERY_TIME_CLOSED_MESSAGE;
    }

    let mobileLayout;
    // mobile layout
    if(mobile === Const.CART_MOBILE_NEW_INPUT_MESSAGE) {
      mobileLayout = 
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => Actions.InputMobilePage({couponIdx: couponIdx})}
        >
          <View style={styles.row}>
            <Text style={Font.DEFAULT_FONT_BLACK}>내 연락처</Text>
            <Text style={[styles.data, mobileHighlight]}>{mobile}</Text>
            <Image
              style={styles.iconDetailImage}
              source={require('../commonComponent/img/icon_input.png')}
            />
          </View>
        </TouchableHighlight>
    } else {
      mobileLayout = 
        <View style={styles.row}>
          <Text style={Font.DEFAULT_FONT_BLACK}>내 연락처</Text>
          <Text style={[styles.data, mobileHighlight]}>{mobile}</Text>
          <View style={styles.iconDetailImage} />
        </View>
    }

    const orderBtnBackgroundStyle = (enableOrderButton)
      ? styles.orderBtnColorOrange
      : styles.orderBtnColorBlack;
    
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1, }}>
          <PageComment text={'모든 메인메뉴는 전자렌지 조리용입니다.'} />
          <View style={styles.content}>

            <CartMenuList
              cart={cart}
              addItemToCart={(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable) => dispatch(addItemToCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable))}
              decreaseItemFromCart={(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng) => dispatch(decreaseItemFromCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng))} />
            
            <View style={[styles.row, styles.rowMarginTop15]}>
              <Text style={Font.DEFAULT_FONT_BLACK}>합계</Text>
              <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{this.commaPrice(menuTotalPrice, '원')}</Text>
              <View style={styles.iconDetailImage} />
            </View>

            <View style={[styles.row, styles.rowMarginTop1]}>
              <Text style={Font.DEFAULT_FONT_BLACK}>배달비</Text>
              <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{displayDeliveryFee}</Text>
              <View style={styles.iconDetailImage} />
            </View>

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => this.openAlertInputPoint() }
            >
              <View style={styles.row}>
                <Text style={Font.DEFAULT_FONT_BLACK}>포인트 할인 <Text style={Font.DEFAULT_FONT_ORANGE}>({this.commaPrice(point, 'p')} 보유)</Text></Text>
                <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{displayAvailablePoint}</Text>
                <Image style={styles.iconDetailImage} source={require('../commonComponent/img/icon_input.png')} />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => Actions.MyCouponPage({disable: true}) }
            >
              <View style={styles.row}>
                <Text style={Font.DEFAULT_FONT_BLACK}>쿠폰 할인 <Text style={Font.DEFAULT_FONT_ORANGE}>({this.state.cntCoupon}개 보유)</Text></Text>
                <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{displayDiscountCouponPrice}</Text>
                <Image style={styles.iconDetailImage} source={require('../commonComponent/img/icon_input.png')} />
              </View>
            </TouchableHighlight>

            <View style={[styles.row, styles.rowMarginTop1, { backgroundColor: '#FFFAF5' }]}>
              <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>총 결제액</Text>
              <Text style={[styles.data, Font.DEFAULT_FONT_ORANGE_BOLD]}>{this.commaPrice(totalPrice, '원')}</Text>
              <View style={styles.iconDetailImage}/>
            </View>












            <View style={[styles.row, styles.rowMarginTop15]} >
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.checkBtn, { marginRight: normalize(2) }, instantCheckedStyle]}
              >
                <Image style={[styles.iconInCheckBtn, { marginRight: normalize(2) }]} 
                  source={require('./img/thunder_icon.png')}/>
                <Text style={instantCheckedTextStyle}>즉시 배달</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.checkBtn, { marginLeft: normalize(2) }, instantUnCheckedStyle]}
              >
                <Image style={[styles.iconInCheckBtn, { marginRight: normalize(2) }]} 
                  source={require('./img/clock_icon.png')}
                  resizeMode={'contain'}/>
                <Text style={instantUnCheckedTextStyle}>예약 배달</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => Actions.MyAddressPage()}
            >
              <View style={styles.row}>
                <Text style={Font.DEFAULT_FONT_BLACK}>배달 주소</Text>
                <Text style={[styles.data, addressHighlight]}>{`${addressInfo}`}</Text>
                <Image
                  style={styles.iconDetailImage}
                  source={require('../commonComponent/img/icon_input.png')}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => this.openPickerDeliveryTime()}
            >
              <View style={styles.row}>
                <Text style={Font.DEFAULT_FONT_BLACK}>배달 시간</Text>
                <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{this.state.selectedTimeSlot}</Text>
                <View>
                  <Image
                    style={styles.iconDetailImage}
                    source={require('../commonComponent/img/icon_input.png')}/>
                </View>
              </View>
            </TouchableHighlight>




            <View style={[styles.row, styles.rowMarginTop15]} >
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.checkBtn, { marginRight: normalize(2) }]}
              >
                <Image style={[styles.iconInCheckBtn, { marginRight: normalize(2) }]} 
                  source={require('./img/thunder_icon.png')}/>
                <Text>즉시 결제</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.checkBtn, { marginLeft: normalize(2) }]}
              >
                <Image style={[styles.iconInCheckBtn, { marginRight: normalize(2) }]} 
                  source={require('./img/clock_icon.png')}/>
                <Text>현장 결제</Text>
              </TouchableOpacity>
            </View>

            
            {cardLayout}


            {mobileLayout}

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => this.openPickerRecipient()}
            >
              <View style={styles.row}>
                <Text style={Font.DEFAULT_FONT_BLACK}>어느 분이 음식을 받습니까?</Text>
                <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{this.state.selectedRecipient}</Text>
                <Image
                  style={styles.iconDetailImage}
                  source={require('../commonComponent/img/icon_input.png')}
                />
              </View>
            </TouchableHighlight>         

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => this.openPickerPayMethod()}
            >
              <View style={[styles.row, styles.rowMarginTop15]}>
                <Text style={Font.DEFAULT_FONT_BLACK}>결제수단</Text>
                <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{this.state.selectedPayMethod}</Text>
                <View>
                  <Image
                    style={styles.iconDetailImage}
                    source={require('../commonComponent/img/icon_input.png')}
                  />
                </View>
              </View>
            </TouchableHighlight>

            

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => this.openPickerCutlery()}
            >
              <View style={[styles.row, styles.rowMarginTop15]}>
                <Text style={Font.DEFAULT_FONT_BLACK}>포크 / 나이프를 넣어주세요</Text>
                <Text style={[styles.data, Font.DEFAULT_FONT_BLACK]}>{this.state.selectedCutlery}</Text>
                <View>
                  <Image
                    style={styles.iconDetailImage}
                    source={require('../commonComponent/img/icon_input.png')}
                  />
                </View>
              </View>
            </TouchableHighlight>

            {messageLayout}
            

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => this.openAlertToConfirmOrder(cart, totalPrice, availablePoint, couponIdx, menuTotalPrice, discountCouponPrice, this.state.selectedTimeSlot, addressInfo, enableOrderButton, enableOrderButtonText)}
            >
              <View style={[styles.orderbtn, orderBtnBackgroundStyle, orderBtnMarginTopStyle]}>
                <Text style={styles.orderbtnText}>주문하기</Text>
              </View>
            </TouchableHighlight>

            

            <Picker ref={(picker) => {this.timeSlotPicker = picker;}}
              style={{
                height: 320,
                backgroundColor: Color.PRIMARY_BACKGROUND,
              }}
              pickerData={[this.state.timeSlotPickerData]}
              selectedValue={this.state.selectedTimeSlot}
              onPickerDone={(newSelectedTimeSlot) => {
                const selectedTimeSlot = newSelectedTimeSlot[0];
                this.setState({ selectedTimeSlot: newSelectedTimeSlot[0] });
                Mixpanel.trackWithProperties('Choose Delivery Time', { deliveryTime: selectedTimeSlot });
              }}
            />
            <Picker
              ref={(picker) => {this.payMethodPicker = picker;}}
              style={{
                height: 320,
                backgroundColor: Color.PRIMARY_BACKGROUND,
              }}
              pickerData={PICKER_PAY_METHOD_DATA}
              selectedValue={this.state.selectedPayMethod}
              onPickerDone={(pickedValue) => this.setPayMethod(pickedValue)}
            />
            <Picker
              ref={(picker) => {this.cutleryPicker = picker;}}
              style={{
                height: 320,
                backgroundColor: Color.PRIMARY_BACKGROUND,
              }}
              pickerData={PICKER_CUTLERY_DATA}
              selectedValue={this.state.selectedCutlery}
              onPickerDone={(pickedValue) => this.setCutlery(pickedValue)}
            />
            <Picker
              ref={(picker) => {this.recipientPicker = picker;}}
              style={{
                height: 320,
                backgroundColor: Color.PRIMARY_BACKGROUND,
              }}
              pickerData={PICKER_RECIPIENT_DATA}
              selectedValue={(this.state.selectedRecipient === '본인') ? RECIPIENT.SELF : RECIPIENT.OTHER}
              onPickerDone={(pickedValue) => this.setRecipient(pickedValue)}
            />
            
          </View>
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
  content: {
    marginTop: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: normalize(16),
  },
  rowMarginTop15: {
    marginTop: 15,
  },
  rowMarginTop1: {
    marginTop: 1,
  },
  textBlack: {
    color: Color.PRIMARY_BLACK,
  },
  textOrange: {
    color: Color.PRIMARY_ORANGE,
  },
  textBold: {
    fontWeight: 'bold',
  },
  data: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 5,
  },
  iconDetailImage: {
    width: 10,
    height: 10,
  },
  picker: {
    height: 320,
    backgroundColor: Color.PRIMARY_BACKGROUND,
    top: 100,
  },
  pickerToolbar: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  orderbtn: {
    height: 40,
    borderColor: Color.PRIMARY_ORANGE,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(20),
    marginLeft: normalize(16),
    marginRight: normalize(16),
  },
  orderbtnText: {
    color: 'white',
    fontSize: normalize(17),
    fontWeight: 'bold',
  },
  orderBtnColorOrange: {
    backgroundColor: Color.PRIMARY_ORANGE,
    borderColor: Color.PRIMARY_ORANGE,
  },
  orderBtnColorBlack: {
    backgroundColor: Color.PRIMARY_GRAY_BUTTON,
    borderColor: Color.PRIMARY_GRAY_BUTTON,
  },
  innerContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
  },
  modalBackgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textInput: {
    height: 26,
    borderBottomWidth: 1,
    borderColor: Color.PRIMARY_ORANGE,
    fontSize: normalize(13),
    padding: 4,
    marginLeft: 20,
    marginRight: 20,
  },
  modalContentBox: {
    paddingTop: 20,
    alignItems: 'center',
  },
  modalButtonBox: {
    marginTop: 10,
    flexDirection: 'row',
    height: 40,
    alignSelf: 'stretch',
    flex: 1,
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    overflow: 'hidden',
    borderColor: Color.PRIMARY_BLACK,
  },
  otherInfoBox: {
    flex: 1,
    marginTop: normalize(30),
    borderColor: Color.PRIMARY_BACKGROUND,
    backgroundColor: Color.PRIMARY_BACKGROUND,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderBtnMarginTopStyle: {
    marginTop: normalize(10),
  },
  orderBtnMarginTopStyleNon: {
    marginTop: normalize(20),
  },
  checkBtn: {
    flex: 1,
    height: 26,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.PRIMARY_ORANGE,
    flexDirection: 'row',
  },
  iconInCheckBtn: {
    width: normalize(10),
    height: 10,
  },
  checkedBtnStyle: {
    backgroundColor: Color.PRIMARY_ORANGE,
  },
  unCheckedBtnStyle: {
    backgroundColor: 'white',
  },
});
