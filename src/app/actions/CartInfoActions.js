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
  SET_DELIVERY_TYPE_CHECKED: 'SET_DELIVERY_TYPE_CHECKED',
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
  };
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

export function setDeliveryTypeCheck(isInstantDeliveryChecked) {
  return {
    type: CartInfoActions.SET_DELIVERY_TYPE_CHECKED,
    isInstantDeliveryChecked,
  }
}

export function fetchCartInfo(couponIdx) {
  return (dispatch) => {
    const userIdx = userInfo.idx;
    console.log(`${RequestURL.REQUEST_CART_INFO}user_idx=${userIdx}&coupon_idx=${couponIdx}`);
    return fetch(`${RequestURL.REQUEST_CART_INFO}user_idx=${userIdx}&coupon_idx=${couponIdx}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveCartInfo(json)))
      .catch((error) => console.warn(error));
  };
}

export function fetchCartInfoWithChangingCartStatus(cart) {
  const userIdx = userInfo.idx;
  if(Object.keys(cart).length == 0) {
    console.log(`${RequestURL.REQUEST_CART_INFO}user_idx=${1708}`);
    return (dispatch) => {
      return fetch(`${RequestURL.REQUEST_CART_INFO}user_idx=${userIdx}`)
        .then((response) => response.json())
        .then((json) => dispatch(receiveCartInfo(json)))
        .catch((error) => console.warn(error));
    };
  }

  let menuIdx = '';
  let quantity = '';
  
  Object.keys(cart).map((idx) => {
    menuIdx += idx + '|';
    quantity += cart[idx].amount + '|';
  });
  menuIdx = menuIdx.substring(0, menuIdx.length - 1);
  quantity = quantity.substring(0, quantity.length - 1);

  console.log(`${RequestURL.REQUEST_CART_INFO}user_idx=${userIdx}&menu_idx=${menuIdx}&quantity=${quantity}`);
  return (dispatch) => {
    return fetch(`${RequestURL.REQUEST_CART_INFO}user_idx=${userIdx}&menu_idx=${menuIdx}&quantity=${quantity}`)
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
