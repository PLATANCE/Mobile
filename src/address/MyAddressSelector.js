'use strict';

export default function MyAddressSelector(state) {
  const {
    myAddressList,
  } = state.AddressReducer;

  return {
    myAddressList,
  };
}