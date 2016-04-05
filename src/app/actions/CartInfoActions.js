import RequestURL from '../../const/RequestURL';
import userInfo from '../../util/userInfo';


export const CartInfoActions = {
  RECEIVE_CART_INFO: 'RECEIVE_CART_INFO',
  USE_COUPON: 'USE_COUPON',
};

export function receiveCartInfo(cartInfo) {
  return {
    type: CartInfoActions.RECEIVE_CART_INFO,
    cartInfo,
  };
}

export function useCoupon(couponIdx, discountCouponPrice) {
  return {
    type: CartInfoActions.USE_COUPON,
    couponIdx,
    discountCouponPrice
  }
}

export function fetchCartInfo() {
  return (dispatch) => {
    const userIdx = userInfo.idx;
    return fetch(`${RequestURL.REQUEST_CART_INFO}user_idx=${userIdx}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveCartInfo(json)))
      .catch((error) => console.warn(error));
  };
}
