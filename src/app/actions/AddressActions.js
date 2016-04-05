import RequestURL from '../../const/RequestURL';
import userInfo from '../../util/userInfo';


export const AddressActions = {
  RECEIVE_MY_ADDRESS_LIST: 'RECEIVE_MY_ADDRESS_LIST',
  RECEIVE_MY_ADDRESS: 'RECEIVE_MY_ADDRESS',
};

export function receiveMyAddressList(myAddressList) {
  return {
    type: AddressActions.RECEIVE_MY_ADDRESS_LIST,
    myAddressList,
  };
}

export function receiveMyAddress(myAddress) {
  return {
    type: AddressActions.RECEIVE_MY_ADDRESS,
    myAddress,
  };
}


export function fetchMyAddressList() {
  return (dispatch) => {
    const userIdx = userInfo.idx;
    return fetch(`${RequestURL.REQUEST_MY_ADDRESS_LIST}user_idx=${userIdx}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveMyAddressList(json)))
      .catch((error) => console.warn(error));
  };
}

export function fetchMyAddress() {
  return (dispatch) => {
    const userIdx = userInfo.idx;
    return fetch(`${RequestURL.REQUEST_MY_ADDRESS}user_idx=${userIdx}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveMyAddress(json)))
      .catch((error) => console.warn(error));
  };
}
