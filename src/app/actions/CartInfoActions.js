import React, {
  Alert,
} from 'react-native';
import RequestURL from '../../const/RequestURL';
import userInfo from '../../util/userInfo';


export const CartInfoActions = {
  RECEIVE_CART_INFO: 'RECEIVE_CART_INFO',
  SET_COUPON_WILL_USE: 'SET_COUPON_WILL_USE',
  SET_POINT_WILL_USE: 'SET_POINT_WILL_USE',
  SET_SELECTED_TIME_SLOT: 'SET_SELECTED_TIME_SLOT',
  SET_SELECTED_PAY_METHOD: 'SET_SELECTED_PAY_METHOD',
  SET_SELECTED_RECIPIENT: 'SET_SELECTED_RECIPIENT',
  SET_SELECTED_CUTLERY: 'SET_SELECTED_CUTLERY',
  CLEAR_CART_INFO: 'CLEAR_CART_INFO',
  RECEIVE_MY_COUPON_COUNT: 'RECEIVE_MY_COUPON_COUNT',
};

export function receiveCartInfo(cartInfo) {
  return {
    type: CartInfoActions.RECEIVE_CART_INFO,
    cartInfo,
  };
}

export function receiveMyCouponCount(myCouponCount) {
  return {
    type: CartInfoActions.RECEIVE_MY_COUPON_COUNT,
    myCouponCount,
  };
}

export function clearCartInfo() {
  return {
    type: CartInfoActions.CLEAR_CART_INFO,
  };
}

export function setCouponWillUse(couponIdxWillUse, couponPriceWillUse, pointWillUse) {
  return {
    type: CartInfoActions.SET_COUPON_WILL_USE,
    couponIdxWillUse,
    couponPriceWillUse,
    pointWillUse,
  }
}

export function setPointWillUse(pointWillUse) {
  return {
    type: CartInfoActions.SET_POINT_WILL_USE,
    pointWillUse,
  }
}

export function setSelectedTimeSlot(selectedTimeSlotIdxInArray) {
  return {
    type: CartInfoActions.SET_SELECTED_TIME_SLOT,
    selectedTimeSlotIdxInArray,
  }
}

export function setSelectedPayMethod(selectedPayMethod) {
  return {
    type: CartInfoActions.SET_SELECTED_PAY_METHOD,
    selectedPayMethod,
  }
}

export function setSelectedRecipient(selectedRecipient) {
  return {
    type: CartInfoActions.SET_SELECTED_RECIPIENT,
    selectedRecipient,
  }
}

export function setSelectedCutlery(selectedCutlery) {
  return {
    type: CartInfoActions.SET_SELECTED_CUTLERY,
    selectedCutlery,
  }
}

export function fetchCartInfo(couponIdx) {
  return (dispatch) => {
    const userIdx = userInfo.idx;
    return fetch(`${RequestURL.REQUEST_CART_INFO}user_idx=${userIdx}&coupon_idx=${couponIdx}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveCartInfo(json)))
      .catch((error) => console.warn(error));
  };
}

export function fetchMyCouponCount() {
  return (dispatch) => {
    const userIdx = userInfo.idx;
    fetch(RequestURL.REQUEST_MY_COUPON_LIST + 'user_idx=' + userIdx)
    .then((response) => response.json())
    .then((responseData) => {dispatch(receiveMyCouponCount(responseData.length))})
    .catch((error)=> console.warn(error));
  };
}
