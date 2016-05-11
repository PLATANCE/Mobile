'use strict';

export default function MyAddressSelector(state) {
  const {
    myAddressList,
  } = state.AddressReducer;
  const {
  	couponIdx,
  } = state.CartInfoReducer;
  return {
    myAddressList,
    couponIdx,
  };
}