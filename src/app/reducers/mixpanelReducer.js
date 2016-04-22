import {
  Actions,
} from 'react-native-router-flux';

import MixpanelActions from '../actions/MixpanelActions';

const defaultState = {
  actionName: '',
  isNeedTrack: false,
  properties: {},
};
const defaultMixpanelProperties = {
  /*
  CSMainPage: {
    actionName: '(Screen) Support',
    properties: {
      viewDeliveryArea: false,
      viewFAQ: false,
      viewContact: false,
      viewTerms: false,
    },
  },
  ReferPage: {
    actionName: 'View Refer Screen',
    properties: {
      readDetail: false,
    },
  },
  MyOrderPage: {
    actionName: 'View Order Detail',
    properties: {
      editReview: false
    },
  },
  WriteReviewPage: {
    actionName: 'Review Worksheet',
    properties: {
      submit: false,
      autoPopUp: false,
    },
  },
  */
}
function mixpanelReducer(state = Object.assign({}, defaultState), action) {
  switch (action.type) { 
    /*
    case Actions.BEFORE_ROUTE:
      {
        const route = action.name;
        const defaultProperties = defaultMixpanelProperties[route];
        if(defaultProperties) {
          return Object.assign({}, state, defaultProperties)
        }
      }
    case Actions.BEFORE_POP:
    case Actions.BEFORE_DISMISS:
      {
        const route = action.name;
        let isNeedTrack = false;

        if(defaultMixpanelProperties[route]) {
          isNeedTrack = true;
        }

        return Object.assign({}, state, {
          isNeedTrack,
        });
      }
    */
    case MixpanelActions.CLEAR_PROPERTIES:
      {
        return Object.assign({}, defaultState);
      }
    case MixpanelActions.ADD_PROPERTIES:
      {
        const properties = action.properties;
        return Object.assign({}, state, {
          properties,
        });
      }
    default:
      return state;
  }
}

export default mixpanelReducer;