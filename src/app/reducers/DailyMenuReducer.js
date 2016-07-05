import {
   DailyMenuActions,
} from '../actions/DailyMenuActions';

const initialState = {
   	dailyMenu: [],
};

const dailyMenuReducer = function(state = initialState, action) {
  switch (action.type) {
  	case DailyMenuActions.RECEIVE_DAILY_MENU: {
      const dailyMenu = action.dailyMenu;
      return Object.assign({}, state, {
        dailyMenu,
      });
  	}

    default:
    	return state;
   }    
};

export default dailyMenuReducer;