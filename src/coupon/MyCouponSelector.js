export default (state) => ({
    cart: state.CartReducers.cart,
    pointWillUse: state.CartInfoReducer.pointWillUse,
    couponIdxWillUse: state.CartInfoReducer.couponIdxWillUse,
    couponPriceWillUse: state.CartInfoReducer.couponPriceWillUse,
});
