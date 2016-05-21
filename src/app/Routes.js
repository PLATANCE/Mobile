'use strict';
import React, { Component, AppRegistry, Navigator, StyleSheet, Text, View, Image, TouchableHighlight, Platform, Alert } from 'react-native';
import ReactNativeRouter, { Route, Schema, Animations, TabBar, Actions } from 'react-native-router-flux';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import Reducers from './reducers';
import thunk from 'redux-thunk'

import Color from '../const/Color';
import Const from '../const/Const';
import SideDrawer from '../commonComponent/SideDrawer';
import TabView from '../customerService/components/TabView';

import TutorialPage from '../tutorial/TutorialPage';
import SignInPage from '../login/SignInPage';
import SignUpPage from '../login/SignUpPage';
import DailyMenuPage from '../dailyMenu/DailyMenuPage';
import DailyMenuSelector from '../dailyMenu/DailyMenuSelector';
import SideDrawerSelector from '../commonComponent/SideDrawerSelector';
import BannerDetailPage from '../dailyMenu/BannerDetailPage';
import BannerDetailSelector from '../dailyMenu/BannerDetailSelector';
import MenuDetailPage from '../menuDetail/MenuDetailPage';
import MenuDetailSelector from '../menuDetail/MenuDetailSelector';
import CartPage from '../cart/CartPage';
import CartSelector from '../cart/CartSelector';
import AddCardPage from '../cart/AddCardPage';
import AddCardSelector from '../cart/AddCardSelector';
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

const Router = connect()(ReactNativeRouter.Router);
const store = createStore(
  Reducers,
  applyMiddleware(thunk)
);

initMixpanel(store);

const hideNavBar = Platform.OS === 'android'
const paddingTop = Platform.OS === 'android' ? 0 : 8

export default class Routes extends Component {
    constructor(props) {
        super(props);
    }
    renderDrawerButton() {
        return (
            <TouchableHighlight style={styles.leftButton} onPress={ () => { this.drawerOpen(), Mixpanel.track('Open Side Menu') } } underlayColor={'transparent'}>
                <Image style={styles.image}
                    source={require('../commonComponent/img/drawer_white.png')}/>
            </TouchableHighlight>
        );
    }
    renderCartButton() {
        function onCartButtonPress () {
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
        return (
            <TouchableHighlight style={styles.rightButton}
                onPress={onCartButtonPress}
                underlayColor={'transparent'}>
                <Image style={styles.image}
                    source={require('../commonComponent/img/cart_white.png')}/>
            </TouchableHighlight>
        );
    }
    renderBackButton() {        
        return (
            <TouchableHighlight style={styles.leftButton} onPress={Actions.pop} underlayColor={'transparent'}>
                <Image style={styles.image}
                    source={require('../commonComponent/img/back_white.png')}/>
            </TouchableHighlight>
        );
    }

    drawerOpen() {
        this.refs.sideDrawer.refs.drawer.open();
    }

    //<Route name="SignInPage"  hideNavBar={true} initial={userInfo.isLogin ? false : true} component={connect()(SignInPage)} />
    //<Route name='DrawerPage' hideNavBar={true} type='replace'
                        //initial={userInfo.isLogin ? true : false} >
    render() {
        return (

            <Provider store={store}>
                <Router navigationBarStyle={styles.navigationBar} titleStyle={styles.title} >
                    <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                    <Schema name="withoutAnimation"/>
                    
                    <Route name="TutorialPage" hideNavBar={true} initial={userInfo.isLogin ? false : true} component={connect()(TutorialPage)} />
                    <Route name="SignInPage"  hideNavBar={true}  component={connect()(SignInPage)} />
                    <Route name="SignUpPage" hideNavBar={true} component={connect()(SignUpPage)} />

                    <Route name='DrawerPage' hideNavBar={true} type='replace'
                        initial={userInfo.isLogin ? true : false} >
                        <SideDrawer ref='sideDrawer' userIdx={userInfo.idx}>
                            <Router
                                sceneStyle={styles.scene}
                                navigationBarStyle={styles.navigationBar}
                                titleStyle={styles.title} >
                                <Route name="DailyMenuPage"
                                        schema='DrawerPage'
                                        component={connect(DailyMenuSelector)(DailyMenuPage)}
                                        title="TODAY'S MENU"
                                        renderLeftButton={this.renderDrawerButton.bind(this)}
                                        renderRightButton={this.renderCartButton} />
                            </Router>
                        </SideDrawer>
                    </Route>


                    <Route name="MenuDetailPage" component={connect(MenuDetailSelector)(MenuDetailPage)}
                        wrapRouter={true}  navigationBarStyle={this.navigationBar}
                        title="TODAY'S MENU" renderLeftButton={this.renderBackButton}
                        renderRightButton={this.renderCartButton}/>

                    <Route name="BannerDetailPage"  component={connect(BannerDetailSelector)(BannerDetailPage)}
                        title="배너 상세보기" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="CartPage" component={connect(CartSelector)(CartPage)} title="CART"
                        wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="AddCardPage" component={connect(AddCardSelector)(AddCardPage)} title="카드 등록"
                        wrapRouter={true} navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="ChefDetailPage" component={connect()(ChefDetailPage)}
                        title="CHEF" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton}
                        renderRightButton={this.renderCartButton}/>

                    <Route name="MyAddressPage" component={connect(MyAddressSelector)(MyAddressPage)}
                        title="배달 주소" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="AddAddressPage" component={connect(AddAddressSelector)(AddAddressPage)}
                        title="배달 주소 입력" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton}
                        renderRightButton={this.renderCartButton}/>

                    <Route name="AddressCoveragePage" component={connect(AddressCoverageSelector)(AddressCoveragePage)}
                        title="배달 가능 지역" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="ReferPage" component={connect(ReferSelector)(ReferPage)}
                        title="친구 초대" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="MyPointPage" component={connect(MyPointSelector)(MyPointPage)}
                        title="포인트 조회" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="MyCouponPage" component={connect(MyCouponSelector)(MyCouponPage)}
                        title="내 쿠폰" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="MyOrderPage" component={connect()(MyOrderPage)}
                        title="주문 내역" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="OrderDetailPage" component={connect()(OrderDetailPage)}
                        title="주문 상세 보기" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="MenuReviewPage"  component={connect()(MenuReviewPage)}
                        title="REVIEW" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="WriteReviewPage"  component={connect(WriteReviewSelector)(WriteReviewPage)}
                        title="리뷰 남기기" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="CSMainPage"  component={connect(CSMainSelector)(CSMainPage)}
                        title="고객 센터" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />
                    <Route name="CSAddressCoveragePage"  component={connect(CSAddressCoverageSelector)(CSAddressCoveragePage)}
                        title="고객 센터" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />
                    <Route name="CSFAQPage"  component={connect(CSFAQSelector)(CSFAQPage)}
                        title="고객 센터" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />
                    <Route name="CSEnquiryPage"  component={connect()(CSEnquiryPage)}
                        title="고객 센터" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />
                    <Route name="CSPolicyPage"  component={connect()(CSPolicyPage)}
                        title="고객 센터" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />
                    <Route name="tabbar">
                        <Router footer={TabBar} hideNavBar={true} tabBarStyle={{borderTopColor:'#00bb00',borderTopWidth:1,backgroundColor:'white'}}>
                            <Route name="tab1" schema="tab" title="Tab #1" >
                                <Router>
                                    <Route name="tab1_1" component={TabView} title="Tab #1_1" />
                                    <Route name="tab1_2" component={TabView} title="Tab #1_2" />
                                </Router>
                            </Route>
                        </Router>
                    </Route>
                    <Route name="PlatingPage"  component={connect()(PlatingPage)}
                        title="PLATING" wrapRouter={true}  navigationBarStyle={styles.navigationBar}
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />
                </Router>
            </Provider>
        );
    }
}
let styles = StyleSheet.create({

    navigationBar: {
        backgroundColor: Color.PRIMARY_ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        height: Const.MARGIN_TOP,
    },
    titleBox: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        alignSelf: 'center',
        flex: 1,
    },
    title: {
        color: 'white',
    },
    leftButton: {
        flex: 1,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightButton: {
        flex: 1,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 20,
        height: 20,
    }
});
