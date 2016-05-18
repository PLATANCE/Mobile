import {
  CustomerServiceActions,
} from '../actions/CustomerServiceActions';

const defaultCustomerServiceState = {
  deliveryCoverage: {},
};
function customerServiceReducer(state = Object.assign({}, defaultCustomerServiceState), action) {
  switch (action.type) {
    case CustomerServiceActions.RECEIVE_DELIVERY_COVERAGE:
      {
        console.log(action);
      	const deliveryCoverage = action.deliveryCoverage;
        console.log(deliveryCoverage);
        return Object.assign({}, state, {
        	deliveryCoverage,
        });
      }
    default:
      return state;
  }
}

export default customerServiceReducer;
