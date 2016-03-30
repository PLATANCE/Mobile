import {
  combineReducers,
} from 'redux';

import CartReducers from './CartReducers';
import CartInfoReducer from './CartInfoReducer';

const Reducers = combineReducers({
  CartReducers,
	CartInfoReducer,
});

export default Reducers;
