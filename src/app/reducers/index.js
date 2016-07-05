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
import CardReducer from './CardReducer';
import GlobalReducer from './GlobalReducer';
import DailyMenuReducer from './DailyMenuReducer';

const Reducers = combineReducers({
  CartReducers,
	CartInfoReducer,
	AddressReducer,
	SideInfoReducer,
	WriteReviewReducer,
	mixpanelReducer,
	CustomerServiceReducer,
	CardReducer,
	GlobalReducer,
	DailyMenuReducer,
});

export default Reducers;
