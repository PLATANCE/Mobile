import RequestURL from '../../const/RequestURL';
import userInfo from '../../util/userInfo';


export const SideInfoActions = {
  RECEIVE_MY_POINT: 'RECEIVE_MY_POINT',
  RECEIVE_MY_COUPON: 'RECEIVE_MY_COUPON',
  CHANGE_DRAWER_STATUS: 'CHANGE_DRAWER_STATUS',
};

export function receiveMyPoint(myPoint) {
  return {
    type: SideInfoActions.RECEIVE_MY_POINT,
    myPoint,
  };
}

export function receiveMyCoupon(myCoupon) {
  return {
    type: SideInfoActions.RECEIVE_MY_COUPON,
    myCoupon,
  };
}

export function changeDrawerStatus(open) {
  return {
    type: SideInfoActions.CHANGE_DRAWER_STATUS,
    open,
  }
}

export function fetchMyPoint() {
  return (dispatch) => {
    const userIdx = userInfo.idx;
    return fetch(`${RequestURL.REQUEST_USER_POINT}user_idx=${userIdx}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveMyPoint(json)))
      .catch((error) => console.warn(error));
  };
}

export function fetchMyCoupon() {
  return (dispatch) => {
    const userIdx = userInfo.idx;
    return fetch(`${RequestURL.REQUEST_MY_COUPON_LIST}user_idx=${userIdx}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveMyCoupon(json)))
      .catch((error) => console.warn(error));
  };
}
