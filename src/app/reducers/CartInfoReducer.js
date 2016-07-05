import {
  CartInfoActions,
} from '../actions/CartInfoActions';
import Const from '../../const/Const';

const defaultCartInfoState = {
  timeSlotData: [],
  myInfo: {},
  cardNumber: '',
  deliveryFee: 0,
  myCouponCount: 0,
  couponIdxWillUse: 0,
  couponPriceWillUse: 0,
  pointWillUse: 0,
  canOrder: false,
  message: '',
  selectedTimeSlot: {},
  selectedPayMethod: 1,
  selectedRecipient: '본인',
  selectedCutlery: 0,
  isImmediateDeliverySupported: false,
  canImmediateDelivery: false,
  immediateDeliveryTime: '',
  isImmediateDeliveryChecked: true,
  messageImmediateDelivery: '',
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
        let selectedTimeSlot = state.selectedTimeSlot;
        if (timeSlotData.length === 0) {
          selectedTimeSlot = {idx: -1, timeSlot: Const.CART_DELIVERY_TIME_CLOSED_MESSAGE};
        } else {
          selectedTimeSlot = timeSlotData[0];
        }
        const canOrder = cartInfo.can_order;
        const message = cartInfo.message;
        const canImmediateDelivery = cartInfo.can_immediate_delivery;
        const isImmediateDeliverySupported = cartInfo.is_immediate_delivery_supported;
        const isImmediateDeliveryChecked = canImmediateDelivery;
        const immediateDeliveryTime = cartInfo.immediate_delivery_time;
        const messageImmediateDelivery = cartInfo.message_immediate_delivery;
        
        return Object.assign({}, state, {
          timeSlotData,
          myInfo,
          cardNumber,
          deliveryFee,
          canOrder,
          message,
          canImmediateDelivery,
          selectedTimeSlot,
          immediateDeliveryTime,
          isImmediateDeliverySupported,
          isImmediateDeliveryChecked,
          messageImmediateDelivery,
        });
      }
    case CartInfoActions.RECEIVE_MY_COUPON_COUNT:
    {
      const myCouponCount = action.myCouponCount;
      return Object.assign({}, state, {
        myCouponCount,
      })
    }
    case CartInfoActions.SET_COUPON_WILL_USE:
    {
        const couponIdxWillUse = action.couponIdxWillUse;
        const couponPriceWillUse = action.couponPriceWillUse;
        let pointWillUse = action.pointWillUse;
        return Object.assign({}, state, {
          couponIdxWillUse,
          couponPriceWillUse,
          pointWillUse,
        })
    }
    case CartInfoActions.SET_POINT_WILL_USE:
    {
        const pointWillUse = action.pointWillUse;
        return Object.assign({}, state, {
          pointWillUse,
        })
    }
    case CartInfoActions.SET_SELECTED_TIME_SLOT:
    {
        const selectedTimeSlotIdxInArray = action.selectedTimeSlotIdxInArray;
        const timeSlotData = state.timeSlotData
        selectedTimeSlot = timeSlotData[selectedTimeSlotIdxInArray];
        return Object.assign({}, state, {
          selectedTimeSlot,
        })
    }
    case CartInfoActions.SET_SELECTED_PAY_METHOD: {
      const selectedPayMethod = action.selectedPayMethod;
      return Object.assign({}, state, {
        selectedPayMethod
      });
    }
    case CartInfoActions.SET_SELECTED_RECIPIENT: {
      const selectedRecipient = action.selectedRecipient;
      return Object.assign({}, state, {
        selectedRecipient
      });
    }
    case CartInfoActions.SET_SELECTED_CUTLERY: {
      const selectedCutlery = action.selectedCutlery;
      return Object.assign({}, state, {
        selectedCutlery
      });
    }
    case CartInfoActions.SET_DELIVERY_TYPE_CHECKED: {
      const isImmediateDeliveryChecked = action.isImmediateDeliveryChecked;
      return Object.assign({}, state, {
        isImmediateDeliveryChecked
      });
    }
    case CartInfoActions.CLEAR_CART_INFO: {
      return Object.assign({}, defaultCartInfoState);
    }
    default:
      return state;
  }
}

export default cartInfoReducer;
