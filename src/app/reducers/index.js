import {
  combineReducers,
} from 'redux';

import CartReducers from './CartReducers';
import CartInfoReducer from './CartInfoReducer';
import AddressReducer from './AddressReducer';
import SideInfoReducer from './SideInfoReducer';
import WriteReviewReducer from './WriteReviewReducer';

const Reducers = combineReducers({
  CartReducers,
	CartInfoReducer,
	AddressReducer,
	SideInfoReducer,
	WriteReviewReducer,
});

export default Reducers;
