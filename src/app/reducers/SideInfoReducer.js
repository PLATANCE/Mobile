import {
  SideInfoActions,
} from '../actions/SideInfoActions';

function sideInfoReducer(state = {
  myPoint: 0,
  countOfMyCoupon: 0,
}, action) {
  switch (action.type) {
    case SideInfoActions.RECEIVE_MY_POINT:
      {
        const myPoint = action.myPoint;
        return Object.assign({}, state, {
          myPoint: myPoint.point,
        });
      }
    case SideInfoActions.RECEIVE_MY_COUPON:
      {
        const myCoupon = action.myCoupon;
        return Object.assign({}, state, {
          countOfMyCoupon: myCoupon.length,
        });
      }
    default:
      return state;
  }
}

export default sideInfoReducer;
