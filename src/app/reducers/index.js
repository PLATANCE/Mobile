import {
  combineReducers,
} from 'redux';

import CartReducers from './CartReducers';
import CartInfoReducer from './CartInfoReducer';
import AddressReducer from './AddressReducer';
import SideInfoReducer from './SideInfoReducer';
import WriteReviewReducer from './WriteReviewReducer';
import mixpanelReducer from './mixpanelReducer';

const Reducers = combineReducers({
  CartReducers,
	CartInfoReducer,
	AddressReducer,
	SideInfoReducer,
	WriteReviewReducer,
	mixpanelReducer,
});

export default Reducers;
