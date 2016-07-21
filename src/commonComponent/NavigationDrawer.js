import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer, Actions } from 'react-native-router-flux';
import RequestURL from '../const/RequestURL';
import userInfo from '../util/userInfo';
import SideView from './SideView';
import {
  fetchCartInfo,
  fetchMyCouponCount,
} from '../app/actions/CartInfoActions';
import {
  changeDrawerStatus,
} from '../app/actions/SideInfoActions';

const propTypes = {
  navigationState: PropTypes.object,
};

class NavigationDrawer extends Component {

  constructor(props) {
    super(props);
    props.dispatch(fetchCartInfo(props.couponIdxWillUse));
    props.dispatch(fetchMyCouponCount());
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      couponIdxWillUse,
      open,
    } = this.props;
    if(nextProps.open !== open && nextProps.open) {
      dispatch(fetchCartInfo(couponIdxWillUse));
      dispatch(fetchMyCouponCount());
    }
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    const {
      myInfo,
      myCouponCount,
      dispatch,
      couponIdxWillUse,
      open,
    } = this.props;
    
    const {
      point,
    } = myInfo;

    return (
      <Drawer
        ref="navigation"
        type="displace"
        onOpen={ () => dispatch(changeDrawerStatus(!open)) }
        onClose={ () => dispatch(changeDrawerStatus(!open)) }
        content={
          <SideView
            point={point}
            cntCoupon={myCouponCount}
            onFetchCartInfo={ () => dispatch(fetchCartInfo(couponIdxWillUse)) }
            onFetchMyCouponCount={ () => dispatch(fetchMyCouponCount()) }
          />
        }
        tapToClose
        openDrawerOffset={0.3}
        panCloseMask={0.3}
        negotiatePan
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

NavigationDrawer.propTypes = propTypes;

export default NavigationDrawer;