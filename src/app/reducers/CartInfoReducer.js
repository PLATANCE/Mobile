import {
  CartInfoActions,
} from '../actions/CartInfoActions';

const defaultCartInfoState = {
  timeSlotData: [],
  myInfo: {},
  cardNumber: '',
  deliveryFee: 0,
  couponIdx: 0,
  discountCouponPrice: 0,
  availablePoint: 0,
};
function cartInfoReducer(state = Object.assign({}, defaultCartInfoState), action) {
  switch (action.type) {
    case CartInfoActions.RECEIVE_CART_INFO:
      {
        const cartInfo = action.cartInfo;
        const receivedMyInfo = cartInfo.my_info;
        const myInfo = {
          mobile: receivedMyInfo.mobile,
          point: receivedMyInfo.point,
          address: receivedMyInfo.address,
          addressDetail: receivedMyInfo.address_detail,
          deliveryAvailable: receivedMyInfo.delivery_available,
        };
        const cardNumber = cartInfo.card_no;
        const deliveryFee = cartInfo.delivery_fee;
        const timeSlotData = [];
        cartInfo.time_slot.forEach(timeSlot => {
          timeSlotData.push({
            idx: timeSlot.idx,
            timeSlot: timeSlot.time_slot,
          });
        });
        return Object.assign({}, state, {
          timeSlotData,
          myInfo,
          cardNumber,
          deliveryFee,
        });
      }
      case CartInfoActions.USE_COUPON: {
        const couponIdx = action.couponIdx;
        const discountCouponPrice = action.discountCouponPrice;
        return Object.assign({}, state, {
          couponIdx,
          discountCouponPrice,
        })
      }
      case CartInfoActions.SET_AVAILABLE_POINT: {
        const availablePoint = action.availablePoint;
        console.log(availablePoint);
        return Object.assign({}, state, {
          availablePoint,
        })
      }
      case CartInfoActions.CLEAR_CART_INFO: {
        return Object.assign({}, defaultCartInfoState);
      }
    default:
      return state;
  }
}

export default cartInfoReducer;
