export default (state) => ({
  cart: state.CartReducers.cart,
  myAddress: state.AddressReducer.myAddress,
  dailyMenu: state.DailyMenuReducer.dailyMenu,
  scene: state.GlobalReducer.scene,
  couponIdxWillUse: state.CartInfoReducer.couponIdxWillUse,
});