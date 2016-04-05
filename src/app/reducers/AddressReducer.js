import {
  AddressActions,
} from '../actions/AddressActions';
import Const from '../../const/Const';

// 먼저, 배달 가능 지역을 확인해주세요 :)
function addressReducer(state = {
  myAddressList: {},
  address: '',
  addressDetail: '',
}, action) {
  switch (action.type) {
    case AddressActions.RECEIVE_MY_ADDRESS_LIST:
      {
        const myAddressList = action.myAddressList;
        
        return Object.assign({}, state, {
          myAddressList,
        });
      }
    case AddressActions.RECEIVE_MY_ADDRESS:
      {
        const myAddress = action.myAddress[0];
        let address = myAddress.address;
        if(address === Const.CART_ADDRESS_INPUT_MESSAGE) {
          address = '먼저, 배달 가능 지역을 확인해주세요 :)';
        }
        return Object.assign({}, state, {
          address: address,
          addressDetail: myAddress.address_detail,
        });
      }
    default:
      return state;
  }
}

export default addressReducer;
