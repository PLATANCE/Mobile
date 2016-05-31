import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer } from 'react-native-router-flux';
import RequestURL from '../const/RequestURL';
import userInfo from '../util/userInfo';
import SideView from './SideView';

const propTypes = {
  navigationState: PropTypes.object,
};

class NavigationDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: 0,
      cntCoupon: 0,
    };
  }
  componentDidMount() {
    this.fetchUserPoint();
    this.fetchMyCoupon();
    console.log("sdff");
  }
  componentWillReceiveProps(nextProps) {
  }
  fetchUserPoint() {
    const userIdx = userInfo.idx;
    fetch(RequestURL.REQUEST_USER_POINT + 'user_idx=' + userIdx)
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData) {
          this.setState({
            point: responseData.point,
          });
        }
      })
      .catch((error)=> {
        console.warn(error);
      })
    }
  fetchMyCoupon() {
    const userIdx = userInfo.idx;
    fetch(RequestURL.REQUEST_MY_COUPON_LIST + 'user_idx=' + userIdx)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        cntCoupon: responseData.length,
      });
    })
    .catch((error)=> {
      console.warn(error);
    })
    
  }
  render() {
    const children = this.props.navigationState.children;
    const point = this.state.point;
    const cntCoupon = this.state.cntCoupon;

    return (
      <Drawer
        ref="navigation"
        type="displace"
        content={<SideView point={point} cntCoupon={cntCoupon} fetchUserPoint={() => this.fetchUserPoint()}/>}
        tapToClose
        openDrawerOffset={0.3}
        panCloseMask={0.2}
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