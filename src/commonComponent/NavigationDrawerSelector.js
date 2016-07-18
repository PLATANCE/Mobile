'use strict';

export default (state) => ({
    myInfo: state.CartInfoReducer.myInfo,
    myCouponCount: state.CartInfoReducer.myCouponCount,
    couponIdxWillUse: state.CartInfoReducer.couponIdxWillUse,
    open: state.SideInfoReducer.open,
    cart: state.CartReducers.cart,
});