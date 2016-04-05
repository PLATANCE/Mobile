import {
  CartInfoActions,
} from '../actions/CartInfoActions';

function cartInfoReducer(state = {
  timeSlotData: [],
  myInfo: {},
  cardNumber: '',
  deliveryFee: 0,
  couponIdx: 0,
  discountCouponPrice: 0,
}, action) {
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
        console.log(couponIdx, discountCouponPrice);
        return Object.assign({}, state, {
          couponIdx,
          discountCouponPrice,
        })
      }
    default:
      return state;
  }
}

export default cartInfoReducer;
