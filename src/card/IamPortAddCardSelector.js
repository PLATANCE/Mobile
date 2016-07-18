export default (state) => ({
	cardInfo: state.CardReducer,
	couponIdxWillUse: state.CartInfoReducer.couponIdxWillUse,
});