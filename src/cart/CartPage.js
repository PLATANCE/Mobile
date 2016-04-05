'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  Alert,
  AlertIOS,
} from 'react-native';
import Picker from 'react-native-picker';
import { Actions } from 'react-native-router-flux';
import PageComment from '../commonComponent/PageComment';
import CartMenuList from './components/CartMenuList';
import PaymentInfoRow from './components/PaymentInfoRow';
import AddressInfoRow from './components/AddressInfoRow';
import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import {
  addItemToCart,
  decreaseItemFromCart,
} from '../app/actions/CartActions';
import {
  fetchCartInfo,
} from '../app/actions/CartInfoActions';


import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;
const PAY_METHOD = {
  ONLINE_CARD: '카드',
  OFFLINE_CARD: '현장카드',
  OFFLINE_CASH: '현금',
};
const CUTLERY = {
  YES: '예',
  NO: '아니요',
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

export default class CartPage extends React.Component {
  constructor(props) {
    super(props);
    const timeSlotPickerData = this.generateTimeSlotPickerData(props.timeSlotData);
    const selectedTimeSlot = (timeSlotPickerData.length)
      ? timeSlotPickerData[0]
      : Const.CART_DELIVERY_TIME_CLOSED_MESSAGE;

    this.state = {
      timeSlotPickerData,
      selectedTimeSlot,
      selectedCutlery: CUTLERY.YES,
      selectedCutleryParam: 0,
      selectedPayMethod: PAY_METHOD.ONLINE_CARD,
      selectedPayMethodParam: 1,
      totalPrice: 0,
    };

    props.dispatch(fetchCartInfo());
  }

  componentWillReceiveProps(nextProps) {
    // if cart length < 1, move to dailyMenu
    if (Object.keys(nextProps.cart).length === 0) {
      return Actions.pop();
    }

    const timeSlotPickerData = this.generateTimeSlotPickerData(nextProps.timeSlotData);

    this.setState({
      timeSlotPickerData,
      selectedTimeSlot: timeSlotPickerData[0],
    });
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
      selectedPayMethodParam = 1;
    } else if (selectedPayMethod === PAY_METHOD.OFFLINE_CARD) {
      selectedPayMethodParam = 2;
    } else if (selectedPayMethod === PAY_METHOD.OFFLINE_CASH) {
      selectedPayMethodParam = 3;
    }
    this.setState({
      selectedPayMethod,
      selectedPayMethodParam,
    });
    console.log(selectedPayMethod, selectedPayMethodParam);
  }

  setCutlery(selectedItem) {
    const selectedCutlery = selectedItem[0]
    let selectedCutleryParam;
    if (selectedCutlery === CUTLERY.YES) {
      selectedCutleryParam = 1;
    } else if(selectedCutlery === CUTLERY.NO){
      selectedCutleryParam = 0;
    }
    this.setState({
      selectedCutlery,
      selectedCutleryParam,
    });
    console.log(selectedCutlery, selectedCutleryParam);
  }


  openAlertMoble() {
    AlertIOS.prompt('전화 번호', '배달 시, 연락 받으실 전화번호를 입력해주세요.(-제외)\n 예) 01012345678', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      }, {
        text: '확인',
        onPress: (mobile) => this.submitUserMobile(mobile),
      },
    ]);
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


  commaPrice(price) {
    const priceString = String(price);
    const commaedPrice = priceString.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    return `${commaedPrice}원`;
  }

  submitUserMobile(mobile) {
    const param = {
      user_idx: userIdx,
      phone_no: mobile,
    };

    fetch(RequestURL.SUBMIT_UPDATE_MOBILE, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    }).then((response) => response.json()).then((responseData) => {
      this.props.dispatch(fetchCartInfo());
      console.log(responseData); // {update: 'mobile'}
    }).catch((error) => {
      console.warn(error);
    }).done();
  }

  openAlertToConfirmOrder(cart, totalPrice, point, couponIdx, enableOrderButton) {
    if (enableOrderButton) {
      const selectedTimeSlot = this.state.selectedTimeSlot;
      const myInfo = this.props.myInfo;

      Alert.alert('주문 요약',
      `배달 시간\n ${selectedTimeSlot}\n\n배달 주소\n${myInfo.address}${myInfo.addressDetail}` +
      `\n\n최종 결제 금액\n${this.commaPrice(totalPrice)}`, [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        }, {
          text: '주문',
          onPress: () => this.submitPlaceOrder(cart, totalPrice, point, couponIdx),
        },
      ]);
    }
  }

  getSelectedTimeSlotIdx() {
    const {
      timeSlotData,
    } = this.props;

    const {
      selectedTimeSlot,
    } = this.state;

    let selectedTimeSlotIdx;
    timeSlotData.forEach(timeSlotDatum => {
      const {
        timeSlot,
        idx,
      } = timeSlotDatum;
      if (selectedTimeSlot === timeSlot) {
        selectedTimeSlotIdx = idx;
      }
    });
    return selectedTimeSlotIdx;
  }

  submitPlaceOrder(cart, totalPrice, point, couponIdx) {
    let menuDIdxParam = '';
    let menuAmountParam = '';
    for (const menuIdx in cart) {
      if (cart.hasOwnProperty(menuIdx)) {
        menuDIdxParam += `${cart[menuIdx].menuDIdx}|`;
        menuAmountParam += `${cart[menuIdx].amount}|`;
      }
    }
    menuDIdxParam = menuDIdxParam.substring(0, menuDIdxParam.length - 1);
    menuAmountParam = menuAmountParam.substring(0, menuAmountParam.length - 1);
    const param = {
      user_idx: userIdx,
      time_slot: this.getSelectedTimeSlotIdx(),
      total_price: totalPrice,
      menu_d_idx: menuDIdxParam,
      order_amount: menuAmountParam,
      point,
      pay_method: this.state.selectedPayMethodParam,
      coupon_idx: couponIdx,
      include_cutlery: this.state.selectedCutleryParam,
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
        } break;
        case 'done': {
          const orderIdx = responseData.order_idx;
          const description = responseData.description;
          Alert.alert('주문 성공', `${description}\n주문내역을 확인하세요 :)`, [
            {
              text: '주문 확인',
              onPress: () => Actions.OrderDetailPage({orderIdx}),
            },
          ]);
        } break;
        default:
          break;
      }
    }).catch((error) => {
      console.warn(error);
    });
  }
  render() {
    console.log(this.props);

    const {
      dispatch,
      cart,
      deliveryFee,
      timeSlotData,
      couponIdx,
      discountCouponPrice,
      myInfo,
      cardNumber,
    } = this.props;

    const {
      deliveryAvailable,
      address,
      addressDetail,
      mobile,
    } = myInfo;

    const {
      selectedPayMethod,
      selectedPayMethodParam,
      selectedTimeSlot,
    } = this.state;

    let totalPrice = 0;

    // orage text or black text when properyly input
    const addressHighlight = (address === Const.CART_ADDRESS_INPUT_MESSAGE)
      ? styles.textOrange
      : styles.textBlack;
    const addressInfo = (address === Const.CART_ADDRESS_INPUT_MESSAGE)
      ? Const.CART_ADDRESS_INPUT_MESSAGE
      : address + '\n' + addressDetail;
    const mobileHighlight = (mobile === Const.CART_MOBILE_INPUT_MESSAGE)
      ? styles.textOrange
      : styles.textBlack;
    const cardHighlight = (cardNumber === Const.CART_CARD_INPUT_MESSAGE)
      ? styles.textOrange
      : styles.textBlack;

    // card layout visible
    let cardLayout = false;
    if (selectedPayMethod === PAY_METHOD.ONLINE_CARD) {
      cardLayout = <TouchableHighlight underlayColor={'transparent'} onPress={Actions.AddCardPage}>
        <View style={styles.row}>
          <Text style={styles.textBlack}>카드</Text>
          <Text style={[styles.data, cardHighlight]}>{cardNumber}</Text>
          <View>
            <Image style={styles.iconDetailImage} source={require('../commonComponent/img/icon_input.png')} />
          </View>
        </View>
      </TouchableHighlight>;
    }

    // menu total price
    let menuTotalPrice = 0;
    for (const menuIdx in cart) {
      if (cart.hasOwnProperty(menuIdx)) {
        menuTotalPrice += cart[menuIdx].altPrice * cart[menuIdx].amount;
      }
    }

    // availablePoint
    let availablePoint = 0;
    if (discountCouponPrice) {
      if (myInfo.point >= menuTotalPrice + deliveryFee - discountCouponPrice) {
        availablePoint = menuTotalPrice + deliveryFee - discountCouponPrice;
      } else {
        availablePoint = myInfo.point;
      }
    } else {
      if (myInfo.point >= menuTotalPrice + deliveryFee) {
        availablePoint = menuTotalPrice + deliveryFee;
      } else {
        availablePoint = myInfo.point;
      }
    }

    // totalPrice
    totalPrice = menuTotalPrice - deliveryFee - availablePoint - discountCouponPrice;

    // enable order button with background color
    let enableOrderButton = true;
    let enableOrderButtonText = '주문하기';
    if (address === Const.CART_ADDRESS_INPUT_MESSAGE) {
      enableOrderButton = false;
      enableOrderButtonText = Const.CART_ADDRESS_INPUT_MESSAGE;
    }
    if (mobile === Const.CART_MOBILE_INPUT_MESSAGE) {
      enableOrderButton = false;
      enableOrderButtonText = Const.CART_MOBILE_INPUT_MESSAGE;
    }
    if (selectedTimeSlot === Const.CART_DELIVERY_TIME_CLOSED_MESSAGE) {
      enableOrderButton = false;
      enableOrderButtonText = Const.CART_DELIVERY_TIME_CLOSED_MESSAGE;
    }
    if (!deliveryAvailable) {
      enableOrderButton = false;
      enableOrderButtonText = '배달 지역이 아닙니다.';
    }
    if (selectedPayMethodParam === 1) {
      if (cardNumber === Const.CART_CARD_INPUT_MESSAGE) {
        enableOrderButton = false;
        enableOrderButtonText = Const.CART_CARD_INPUT_MESSAGE;
      }
    }

    const orderBtnBackgroundStyle = (enableOrderButton)
      ? styles.orderBtnColorOrange
      : styles.orderBtnColorBlack;

    return (
      <ScrollView>
        <View style={styles.container}>
          <PageComment text={'모든 메인메뉴는 전자렌지 조리용입니다.'} />
          <View style={styles.content}>

            <CartMenuList
              cart={cart}
              addItemToCart={(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable) => dispatch(addItemToCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable))}
              decreaseItemFromCart={(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng) => dispatch(decreaseItemFromCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng))} />

            <View style={[styles.row, styles.rowMarginTop10]}>
              <Text style={styles.textBlack}>합계</Text>
              <Text style={[styles.data, styles.textBlack]}>{this.commaPrice(menuTotalPrice)}</Text>
              <View style={styles.iconDetailImage} />
            </View>

            <View style={[styles.row, styles.rowMarginTop1]}>
              <Text style={styles.textBlack}>배달비</Text>
              <Text style={[styles.data, styles.textBlack]}>{this.commaPrice(deliveryFee)}</Text>
              <View style={styles.iconDetailImage} />
            </View>

            <View style={styles.row}>
              <Text style={styles.textBlack}>포인트 할인</Text>
              <Text style={[styles.data, styles.textBlack]}>-{this.commaPrice(availablePoint)}</Text>
              <View style={styles.iconDetailImage} />
            </View>

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => Actions.MyCouponPage({disable: true}) }
            >
              <View style={styles.row}>
                <Text style={styles.textBlack}>쿠폰 할인</Text>
                <Text style={[styles.data, styles.textBlack]}>-{this.commaPrice(discountCouponPrice | 0)}</Text>
                <Image style={styles.iconDetailImage} source={require('../commonComponent/img/icon_input.png')} />
              </View>
            </TouchableHighlight>

            <View style={[styles.row, styles.rowMarginTop1]}>
              <Text style={styles.textBlack, styles.textBold}>총 결제액</Text>
              <Text style={[styles.data, styles.textOrange, styles.textBold]}>{this.commaPrice(totalPrice)}</Text>
              <View style={styles.iconDetailImage}/>
            </View>

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => Actions.MyAddressPage()}
            >
              <View style={[styles.row, styles.rowMarginTop10]}>
                <Text style={styles.textBlack}>배달 주소</Text>
                <Text style={[styles.data, addressHighlight]}>{`${addressInfo}`}</Text>
                <Image
                  style={styles.iconDetailImage}
                  source={require('../commonComponent/img/icon_input.png')}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => this.openAlertMoble()}
            >
              <View style={styles.row}>
                <Text style={styles.textBlack}>연락처</Text>
                <Text style={[styles.data, mobileHighlight]}>{mobile}</Text>
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
                <Text style={styles.textBlack}>배달 시간</Text>
                <Text style={[styles.data, styles.textBlack]}>{this.state.selectedTimeSlot}</Text>
                <View>
                  <Image
                    style={styles.iconDetailImage}
                    source={require('../commonComponent/img/icon_input.png')}/>
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => this.openPickerCutlery()}
            >
              <View style={styles.row}>
                <Text style={styles.textBlack}>포크 / 나이프를 넣어주세요</Text>
                <Text style={[styles.data, styles.textBlack]}>{this.state.selectedCutlery}</Text>
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
              onPress={() => this.openPickerPayMethod()}
            >
              <View style={styles.row}>
                <Text style={styles.textBlack}>결제수단</Text>
                <Text style={[styles.data, styles.textBlack]}>{this.state.selectedPayMethod}</Text>
                <View>
                  <Image
                    style={styles.iconDetailImage}
                    source={require('../commonComponent/img/icon_input.png')}
                  />
                </View>
              </View>
            </TouchableHighlight>

            {cardLayout}

            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={() => this.openAlertToConfirmOrder(cart, totalPrice, availablePoint, couponIdx, enableOrderButton)}
            >
              <View style={[styles.orderbtn, orderBtnBackgroundStyle]}>
                <Text style={styles.orderbtnText}>{enableOrderButtonText}</Text>
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
                this.setState({ selectedTimeSlot: newSelectedTimeSlot });
              }}
            />
            <Picker
              ref={(picker) => {this.payMethodPicker = picker;}}
              style={{
                height: 320,
                backgroundColor: Color.PRIMARY_BACKGROUND,
                top: 100,
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
                top: 100,
              }}
              pickerData={PICKER_CUTLERY_DATA}
              selectedValue={this.state.selectedCutlery}
              onPickerDone={(pickedValue) => this.setCutlery(pickedValue)}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.PRIMARY_BACKGROUND,
    marginTop: Const.MARGIN_TOP,
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
    padding: 10,
  },
  rowMarginTop10: {
    marginTop: 10,
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
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  orderbtnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  orderBtnColorOrange: {
    backgroundColor: Color.PRIMARY_ORANGE,
    borderColor: Color.PRIMARY_ORANGE,
  },
  orderBtnColorBlack: {
    backgroundColor: Color.PRIMARY_BLACK,
    borderColor: Color.PRIMARY_BLACK,
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
    fontSize: 13,
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
});
