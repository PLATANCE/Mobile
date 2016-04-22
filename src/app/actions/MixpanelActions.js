import Mixpanel from '../../util/mixpanel';

const MixpanelActions = {
  CLEAR_PROPERTIES: 'CLEAR_PROPERTIES',
  ADD_PROPERTIES: 'ADD_PROPERTIES',
};

export default MixpanelActions;

function clearProperties() {
  return {
    type: MixpanelActions.CLEAR_PROPERTIES,
  };
}

export function addProperties(properties = {}) {
  return {
    type: MixpanelActions.ADD_PROPERTIES,
    properties,
  };
}

export function track() {
  return (dispatch, getState) => {
    const {
      mixpanelReducer,
    } = getState();

    const {
      actionName,
      properties,
    } = mixpanelReducer;
    
    Mixpanel.trackWithProperties(actionName, properties);

    return dispatch(clearProperties());
  };
}