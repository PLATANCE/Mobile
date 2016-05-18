import {
  combineReducers,
} from 'redux';

import CartReducers from './CartReducers';
import CartInfoReducer from './CartInfoReducer';
import AddressReducer from './AddressReducer';
import SideInfoReducer from './SideInfoReducer';
import WriteReviewReducer from './WriteReviewReducer';
import mixpanelReducer from './mixpanelReducer';
import CustomerServiceReducer from './CustomerServiceReducer';

const Reducers = combineReducers({
  CartReducers,
	CartInfoReducer,
	AddressReducer,
	SideInfoReducer,
	WriteReviewReducer,
	mixpanelReducer,
	CustomerServiceReducer,
});

export default Reducers;
