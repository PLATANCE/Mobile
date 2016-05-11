import React, {
  Alert,
} from 'react-native';
import RequestURL from '../../const/RequestURL';
import userInfo from '../../util/userInfo';


export const CartInfoActions = {
  RECEIVE_CART_INFO: 'RECEIVE_CART_INFO',
  USE_COUPON: 'USE_COUPON',
  SET_AVAILABLE_POINT: 'SET_AVAILABLE_POINT',
  CLEAR_CART_INFO: 'CLEAR_CART_INFO',
};

export function receiveCartInfo(cartInfo) {
  return {
    type: CartInfoActions.RECEIVE_CART_INFO,
    cartInfo,
  };
}

export function clearCartInfo() {
  return {
    type: CartInfoActions.CLEAR_CART_INFO,
  };
}

export function useCoupon(couponIdx, discountCouponPrice) {
  return {
    type: CartInfoActions.USE_COUPON,
    couponIdx,
    discountCouponPrice
  }
}

export function setAvailablePoint(availablePoint) {
  return {
    type: CartInfoActions.SET_AVAILABLE_POINT,
    availablePoint,
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

export function getAvailablePoint(pointInput) {
  return (dispatch) => {
    const userIdx = userInfo.idx;
    return fetch(`${RequestURL.GET_AVAILABLE_POINT}user_idx=${userIdx}&point_input=${pointInput}`)
      .then((response) => response.json())
      .then((json) => {
        const result = json.result;
        if(result) {
          const availablePoint = json.availablePoint;
          dispatch(setAvailablePoint(availablePoint))
        } else {
          const resultMessage = json.result_msg;
          Alert.alert('포인트 사용 오류', resultMessage);
        }
      })
      .catch((error) => console.warn(error));
  };
}
