import {
  AddressActions,
} from '../actions/AddressActions';
import Const from '../../const/Const';

// 먼저, 배달 가능 지역을 확인해주세요 :)
function addressReducer(state = {
  myAddressList: {},
  myAddress: {},
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
        if(action.myAddress.length > 0) {
          const myAddress = action.myAddress[0];
          return Object.assign({}, state, {
            myAddress,
          });
        } else {
          return Object.assign({}, state, {
            myAddress: {},
          });
        }
      }
    default:
      return state;
  }
}

export default addressReducer;
