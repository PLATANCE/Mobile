import Mixpanel from 'react-native-mixpanel';
import userInfo from '../userInfo';
import { track } from '../../app/actions/MixpanelActions';

Mixpanel.sharedInstanceWithToken('51e3218457e135bc6f284708ae8b93a2');

const idx = userInfo.idx;
if(idx) {
	//Mixpanel.createAlias(idx.toString());
	Mixpanel.identify(idx.toString());
}
//console.log(idx);
let dispatch;
export function addProperties(properties = {}) {
	dispatch(addProperties(properties));
}

export function initMixpanel(store) {
	dispatch = store.dispatch;

	store.subscribe(() => {
		const {
      		mixpanelReducer,
    	} = store.getState();
    	if(mixpanelReducer.isNeedTrack) {
    		dispatch(track());
    	}
	});
}

export default Mixpanel;