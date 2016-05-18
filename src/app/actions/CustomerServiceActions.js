import RequestURL from '../../const/RequestURL';

export const CustomerServiceActions = {
  RECEIVE_DELIVERY_COVERAGE: 'RECEIVE_DELIVERY_COVERAGE',
};

export function receiveDeliveryCoverage(deliveryCoverage) {
  return {
    type: CustomerServiceActions.RECEIVE_DELIVERY_COVERAGE,
    deliveryCoverage,
  };
}

export function fetchDeliveryCoverage() {
  return (dispatch) => {
    return fetch(`${RequestURL.REQUEST_DELIVERY_COVERAGE}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveDeliveryCoverage(json.deliveryCoverage)))
      .catch((error) => console.warn(error));
  };
}