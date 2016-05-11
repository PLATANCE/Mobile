'use strict';

export default function AddCardSelector(state) {
  const {
  	couponIdx,
  } = state.CartInfoReducer;
  return {
    couponIdx,
  };
}