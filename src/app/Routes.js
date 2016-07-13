'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { AppRegistry, Navigator, StyleSheet, Text, View, Image, TouchableHighlight, Platform, Alert, AppState } from 'react-native';

import { Router, Schema, Animations, TabBar, Actions, Scene, Reducer } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import Reducers from './reducers';
import thunk from 'redux-thunk'

import Color from '../const/Color';
import Const from '../const/Const';
import NavigationDrawer from '../commonComponent/NavigationDrawer';
import NavigationDrawerSelector from '../commonComponent/NavigationDrawerSelector';
import TabView from '../customerService/components/TabView';

import TutorialPage from '../tutorial/TutorialPage';
import SignInPage from '../login/SignInPage';
import SignUpPage from '../login/SignUpPage';
import DailyMenuPage from '../dailyMenu/DailyMenuPage';
import DailyMenuSelector from '../dailyMenu/DailyMenuSelector';
import BannerDetailPage from '../dailyMenu/BannerDetailPage';
import BannerDetailSelector from '../dailyMenu/BannerDetailSelector';
import MenuDetailPage from '../menuDetail/MenuDetailPage';
import MenuDetailSelector from '../menuDetail/MenuDetailSelector';
import CartPage from '../cart/CartPage';
import CartSelector from '../cart/CartSelector';
import AddCardPage from '../cart/AddCardPage';
import AddCardSelector from '../cart/AddCardSelector';
import IamPortAddCardPage from '../card/IamPortAddCardPage';
import IamPortAddCardSelector from '../card/IamPortAddCardSelector';
import InputMobilePage from '../cart/InputMobilePage';
import MobileAuthPage from '../cart/MobileAuthPage';
import ChefDetailPage from '../chefDetail/ChefDetailPage';
import ChefDetailSelector from '../chefDetail/ChefDetailSelector';
import MyAddressPage from '../address/MyAddressPage';
import MyAddressSelector from '../address/MyAddressSelector';
import AddAddressPage from '../address/AddAddressPage';
import AddAddressSelector from '../address/AddAddressSelector';
import AddressCoveragePage from '../address/AddressCoveragePage';
import AddressCoverageSelector from '../address/AddressCoverageSelector';
import ReferPage from '../refer/ReferPage';
import ReferSelector from '../refer/ReferSelector';
import MyPointPage from '../point/MyPointPage';
import MyPointSelector from '../point/MyPointSelector';
import MyCouponPage from '../coupon/MyCouponPage';
import MyCouponSelector from '../coupon/MyCouponSelector';
import MyOrderPage from '../order/MyOrderPage';
import MyOrderSelector from '../order/MyOrderSelector';
import OrderDetailPage from '../orderDetail/OrderDetailPage';
import OrderDetailSelector from '../orderDetail/OrderDetailSelector';
import MenuReviewPage from '../review/MenuReviewPage';
import MenuReviewSelector from '../review/MenuReviewSelector';
import WriteReviewPage from '../review/WriteReviewPage';
import WriteReviewSelector from '../review/WriteReviewSelector';
import CSMainPage from '../customerService/CSMainPage';
import CSMainSelector from '../customerService/CSMainSelector';
import CSAddressCoveragePage from '../customerService/CSAddressCoveragePage';
import CSAddressCoverageSelector from '../customerService/CSAddressCoverageSelector';
import CSFAQPage from '../customerService/CSFAQPage';
import CSFAQSelector from '../customerService/CSFAQSelector';
import CSEnquiryPage from '../customerService/CSEnquiryPage';
import CSPolicyPage from '../customerService/CSPolicyPage';
import PlatingPage from '../plating/PlatingPage';

import userInfo from '../util/userInfo';
import Mixpanel, { initMixpanel } from '../util/mixpanel';

import {
    fetchDailyMenu
} from './actions/DailyMenuActions';

const RouterWithRedux = connect()(Router);
const store = compose(
    applyMiddleware(thunk)
)(createStore)(Reducers);

initMixpanel(store);

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: Color.PRIMARY_BACKGROUND,
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : Platform.OS === 'ios' || Platform.Version > 19 ? 64 : 44;
  }
  return style;
};

const reducerCreate = params => {
    const defaultReducer = Reducer(params);
    return (state, action) => {
        //console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

export default class Routes extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnMount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange() {
        const appState = AppState.currentState;
        const {
            myAddress
        } = store.getState().AddressReducer;
        if (appState === 'active') {
            store.dispatch(fetchDailyMenu(myAddress));
        }
    }

    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux getSceneStyle={getSceneStyle} createReducer={reducerCreate}>
                <Scene key="root" hideNavBar={true} hideTabBar={true}>
                    <Scene key="TutorialPage" 
                        hideNavBar={true}
                        initial={userInfo.isLogin ? false : true}
                        component={connect()(TutorialPage)} 
                    />  

                    <Scene key="SignInPage" 
                        hideNavBar={true}
                        component={connect()(SignInPage)} 
                    />

                    <Scene key="SignUpPage" 
                        hideNavBar={true}
                        component={connect()(SignUpPage)}
                    />

                    <Scene key='drawer' component={connect(NavigationDrawerSelector)(NavigationDrawer)} initial={userInfo.isLogin ? true : false} sceneStyle={{backgroundColor: 'white'}} >
                        <Scene key="main" 
                            navigationBarStyle={{backgroundColor: Color.PRIMARY_ORANGE}}
                            titleStyle={{color: 'white'}}
                            backButtonImage={require('../commonComponent/img/back_white.png')}
                            drawerImage={require('../commonComponent/img/drawer_white.png')}
                            leftButtonIconStyle={styles.image} 
                        >
                            
                            <Scene key="DailyMenuPage" 
                                component={connect(DailyMenuSelector)(DailyMenuPage)}
                                title="TODAY'S MENU"
                            />

                            <Scene key="CartPage" 
                                component={connect(CartSelector)(CartPage)}
                                title="장바구니"
                            />

                            <Scene key="MenuDetailPage" 
                                component={connect(MenuDetailSelector)(MenuDetailPage)}
                                title="TODAY'S MENU" 
                            />

                            <Scene key="BannerDetailPage"
                                component={connect(BannerDetailSelector)(BannerDetailPage)}
                                title="배너 상세보기" 
                            />

                            <Scene key="AddCardPage" 
                                component={connect(AddCardSelector)(AddCardPage)} 
                                title="카드 등록"
                            />

                            <Scene key="ChefDetailPage"
                                component={connect()(ChefDetailPage)}
                                title="CHEF"
                            />

                            <Scene key='MyAddressPage' 
                                component={connect(MyAddressSelector)(MyAddressPage)}
                                title="배달 주소"
                            />

                            <Scene key="AddAddressPage" 
                                component={connect(AddAddressSelector)(AddAddressPage)}
                                title="배달 주소 입력"
                                sceneStyle={{backgroundColor: 'white'}}
                            />

                            <Scene key="AddressCoveragePage" 
                                component={connect(AddressCoverageSelector)(AddressCoveragePage)}
                                title="배달 가능 지역"
                            />

                            <Scene key="ReferPage" 
                                component={connect(ReferSelector)(ReferPage)}
                                title="친구 초대" 
                            />

                            <Scene key="MyPointPage" 
                                component={connect(MyPointSelector)(MyPointPage)}
                                title="포인트 조회" 
                            />

                            <Scene key="MyCouponPage" 
                                component={connect(MyCouponSelector)(MyCouponPage)}
                                title="내 쿠폰" 
                            />

                            <Scene key="MyOrderPage" 
                                component={connect()(MyOrderPage)}
                                title="주문 내역" 
                            />

                            <Scene key="OrderDetailPage" 
                                component={connect()(OrderDetailPage)}
                                title="주문 상세 보기" 
                            />

                            <Scene key="MenuReviewPage"  
                                component={connect()(MenuReviewPage)}
                                title="REVIEW"
                            />

                            <Scene key="WriteReviewPage"
                                component={connect(WriteReviewSelector)(WriteReviewPage)}
                                title="리뷰 남기기"
                            />

                            <Scene key="CSMainPage"  
                                component={connect(CSMainSelector)(CSMainPage)}
                                title="고객 센터"
                            />

                            <Scene key="CSAddressCoveragePage"  
                                component={connect(CSAddressCoverageSelector)(CSAddressCoveragePage)}
                                title="고객 센터"
                            />

                            <Scene key="CSFAQPage"  
                                component={connect(CSFAQSelector)(CSFAQPage)}
                                title="고객 센터"
                            />

                            <Scene key="CSEnquiryPage"  
                                component={connect()(CSEnquiryPage)}
                                title="고객 센터"
                            />

                            <Scene key="CSPolicyPage"  
                                component={connect()(CSPolicyPage)}
                                title="고객 센터"
                            />

                            <Scene key="PlatingPage"  
                                component={connect()(PlatingPage)}
                                title="PLATING"
                            />

                            <Scene key="IamPortAddCardPage"  
                                component={connect(IamPortAddCardSelector)(IamPortAddCardPage)}
                                title="카드 등록"
                            />

                            <Scene key="InputMobilePage"  
                                component={connect()(InputMobilePage)}
                                title="내 핸드폰 번호"
                            />

                            <Scene key="MobileAuthPage"  
                                component={connect()(MobileAuthPage)}
                                title="번호 인증"
                            />
                        </Scene>
                    </Scene>
                </Scene>
                </RouterWithRedux> 
            </Provider>  
        );
    }
}
let styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: Color.PRIMARY_ORANGE,
    },
    navigationBar1: {
        backgroundColor: 'yellow',
    },
    title: {
        color: 'white',
    },
    leftButton: {
        width: 130,
        height: 37,
        position: 'absolute',
        bottom: 4,
        left: 2,
        padding: 8,
        flexDirection: 'row',
    },
    leftButtonImage: {
        width: 13,
        height: 21,
    },
    image: {
        width: 20,
        height: 20,
    },
});
