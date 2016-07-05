import RequestURL from '../../const/RequestURL';

export const DailyMenuActions = {
    RECEIVE_DAILY_MENU: 'RECEIVE_DAILY_MENU',
};

export function fetchDailyMenu(myAddress) {
	const url = (myAddress === undefined) ? `${RequestURL.REQUEST_DAILY_MENU}` : `${RequestURL.REQUEST_DAILY_MENU}?area=${myAddress.area}`
	console.log(url);
  return (dispatch) => {
  	fetch(url)
    .then((response) => response.json())
    .then((responseData) => dispatch(receiveDailyMenu(responseData)))
    .catch((error) => console.warn(error));
	};
};

export function receiveDailyMenu(dailyMenu) {
	return {
		type: DailyMenuActions.RECEIVE_DAILY_MENU,
		dailyMenu,
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