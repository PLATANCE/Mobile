import {
  SideInfoActions,
} from '../actions/SideInfoActions';

function sideInfoReducer(state = {
  open: false,
}, action) {
  switch (action.type) {
    case SideInfoActions.CHANGE_DRAWER_STATUS:
      {
        const open = action.open;
        return Object.assign({}, state, {
          open,
        });
      }
    default:
      return state;
  }
}

export default sideInfoReducer;
