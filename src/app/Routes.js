'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { AppRegistry, Navigator, StyleSheet, Text, View, Image, TouchableHighlight, Platform, Alert } from 'react-native';

import { Router, Schema, Animations, TabBar, Actions, Scene } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import Reducers from './reducers';
import thunk from 'redux-thunk'

import Color from '../const/Color';
import Const from '../const/Const';
import NavigationDrawer from '../commonComponent/NavigationDrawer';
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

const RouterWithRedux = connect()(Router);
const store = compose(
    applyMiddleware(thunk)
)(createStore)(Reducers);

initMixpanel(store);

// define this based on the styles/dimensions you use
const getSceneStyle = function (props) {
  return {
    flex: 1,
    marginTop: props.hideNavBar ? 0 : Platform.OS === 'ios' || Platform.Version > 19 ? 64 : 44,
    backgroundColor: Color.PRIMARY_BACKGROUND,
  };
}

export default class Routes extends Component {

    constructor(props) {
        super(props);
    }
   
    onCartButtonPressed() {
        const {
            cart,
        } = store.getState().CartReducers;
            
        if(Object.keys(cart).length == 0) {
            Mixpanel.trackWithProperties('Show Cart', { success: false });
            Alert.alert(
                '장바구니가 비어있습니다.',
                '오늘 드실 플레이팅 요리를 추가해주세요.'
            );
        } else {
            Mixpanel.trackWithProperties('Show Cart', { success: true });
            Actions.CartPage();
        }
    }
    //<Route name="SignInPage"  hideNavBar={true} initial={userInfo.isLogin ? false : true} component={connect()(SignInPage)} />
    //<Route name='DrawerPage' hideNavBar={true} type='replace'
                        //initial={userInfo.isLogin ? true : false} >
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux getSceneStyle={getSceneStyle}>
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

                    <Scene key='drawer' component={NavigationDrawer} initial={userInfo.isLogin ? true : false} sceneStyle={{backgroundColor: 'white'}} >
                        <Scene key="main" 
                            navigationBarStyle={{backgroundColor: Color.PRIMARY_ORANGE}}
                            titleStyle={{color: 'white'}}
                            drawerImage={require('../commonComponent/img/drawer_white.png')}
                            leftButtonIconStyle={{width: 20, height: 20}}
                        >
                            
                            <Scene key="DailyMenuPage" 
                                component={connect(DailyMenuSelector)(DailyMenuPage)}
                                title="TODAY'S MENU"
                                onRight={()=>this.onCartButtonPressed()} rightButtonImage={require('../commonComponent/img/cart_white.png')} rightButtonIconStyle={styles.image} 
                            />

                            <Scene key="CartPage" 
                                component={connect(CartSelector)(CartPage)}
                                title="CART"
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="MenuDetailPage" 
                                component={connect(MenuDetailSelector)(MenuDetailPage)}
                                title="TODAY'S MENU" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                                onRight={()=>this.onCartButtonPressed()} rightButtonImage={require('../commonComponent/img/cart_white.png')} rightButtonIconStyle={styles.image} 
                            />

                            <Scene key="BannerDetailPage"
                                component={connect(BannerDetailSelector)(BannerDetailPage)}
                                title="배너 상세보기" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="AddCardPage" 
                                component={connect(AddCardSelector)(AddCardPage)} 
                                title="카드 등록"
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="ChefDetailPage"
                                component={connect()(ChefDetailPage)}
                                title="CHEF"
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key='MyAddressPage' 
                                component={connect(MyAddressSelector)(MyAddressPage)}
                                title="배달 주소"
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="AddAddressPage" 
                                component={connect(AddAddressSelector)(AddAddressPage)}
                                title="배달 주소 입력"
                                sceneStyle={{backgroundColor: 'white'}}
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="AddressCoveragePage" 
                                component={connect(AddressCoverageSelector)(AddressCoveragePage)}
                                title="배달 가능 지역"
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="ReferPage" 
                                component={connect(ReferSelector)(ReferPage)}
                                title="친구 초대" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="MyPointPage" 
                                component={connect(MyPointSelector)(MyPointPage)}
                                title="포인트 조회" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="MyCouponPage" 
                                component={connect(MyCouponSelector)(MyCouponPage)}
                                title="내 쿠폰" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="MyOrderPage" 
                                component={connect()(MyOrderPage)}
                                title="주문 내역" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="OrderDetailPage" 
                                component={connect()(OrderDetailPage)}
                                title="주문 상세 보기" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="MenuReviewPage"  
                                component={connect()(MenuReviewPage)}
                                title="REVIEW" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="WriteReviewPage"  
                                component={connect(WriteReviewSelector)(WriteReviewPage)}
                                title="리뷰 남기기" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="CSMainPage"  
                                component={connect(CSMainSelector)(CSMainPage)}
                                title="고객 센터" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="CSAddressCoveragePage"  
                                component={connect(CSAddressCoverageSelector)(CSAddressCoveragePage)}
                                title="고객 센터" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="CSFAQPage"  
                                component={connect(CSFAQSelector)(CSFAQPage)}
                                title="고객 센터" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="CSEnquiryPage"  
                                component={connect()(CSEnquiryPage)}
                                title="고객 센터" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />

                            <Scene key="CSPolicyPage"  
                                component={connect()(CSPolicyPage)}
                                title="고객 센터" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />
                            <Scene key="PlatingPage"  
                                component={connect()(PlatingPage)}
                                title="PLATING" 
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />
                            <Scene key="IamPortAddCardPage"  
                                component={connect(IamPortAddCardSelector)(IamPortAddCardPage)}
                                title="IamPortAddCardPage"
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />
                            <Scene key="InputMobilePage"  
                                component={connect()(InputMobilePage)}
                                title="내 핸드폰 번호"
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />
                            <Scene key="MobileAuthPage"  
                                component={connect()(MobileAuthPage)}
                                title="번호 인증"
                                backButtonImage={require('../commonComponent/img/back_white.png')}
                            />
                        </Scene>
                    </Scene>
                </Scene>
                    
{/*}
                    <Scene key="tabbar">
                        <Scene key="tab"footer={TabBar} hideNavBar={true} tabBarStyle={{borderTopColor:'#00bb00',borderTopWidth:1,backgroundColor:'white'}}>
                            <Scene key="tab1" schema="tab" title="Tab #1" >
                                <Scene>
                                    <Scene key="tab1_1" component={TabView} title="Tab #1_1" />
                                    <Scene key="tab1_2" component={TabView} title="Tab #1_2" />
                                </Scene>
                            </Scene>
                        </Scene>
                    </Scene>
*/}  
                    

              
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
