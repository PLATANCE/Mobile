'use strict';
import React, { Component, AppRegistry, Navigator, StyleSheet, Text, View, Image, TouchableHighlight, Platform } from 'react-native';
import ReactNativeRouter, { Route, Schema, Animations, TabBar, Actions } from 'react-native-router-flux';

import { Provider, connect } from 'react-redux';
import { createStore } from 'redux'
import Reducers from './Reducers';

import Color from '../const/Color';
import SideDrawer from '../commonComponent/SideDrawer';

import DailyMenuPage from '../dailyMenu/DailyMenuPage';
import DailyMenuSelector from '../dailyMenu/DailyMenuSelector';
import MenuDetailPage from '../menuDetail/MenuDetailPage';
import MenuDetailSelector from '../menuDetail/MenuDetailSelector';
import CartPage from '../cart/CartPage';
import CartSelector from '../cart/CartSelector';
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
import ReviewPage from '../review/ReviewPage';
import ReviewSelector from '../review/ReviewSelector';

const Router = connect()(ReactNativeRouter.Router);
let store = createStore(Reducers);

const hideNavBar = Platform.OS === 'android'
const paddingTop = Platform.OS === 'android' ? 0 : 8

export default class Routes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawerOpen: true
        }
    }
    renderDrawerButton() {

        return (
            <TouchableHighlight style={styles.leftButton} onPress={this.drawerOpen.bind(this)}>
                <Image style={styles.image}
                    source={require('../commonComponent/img/drawer_white.png')}/>
            </TouchableHighlight>
        );
    }
    renderCartButton() {
        return (
            <TouchableHighlight style={styles.rightButton} onPress={Actions.CartPage}>
                <Image style={styles.image}
                    source={require('../commonComponent/img/cart_white.png')}/>
            </TouchableHighlight>
        );
    }
    renderBackButton() {
        return (
            <TouchableHighlight style={styles.leftButton} onPress={Actions.pop}>
                <Image style={styles.image}
                    source={require('../commonComponent/img/back_white.png')}/>
            </TouchableHighlight>
        );
    }

    drawerOpen() {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    }

    render() {
        console.log(this.state.isDrawerOpen);
        return (
            <Provider store={store}>
                
                <Router navigationBarStyle={styles.navigationBar} titleStyle={styles.title} >
                    <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                    <Schema name="withoutAnimation"/>

                    <Route name='DrawerPage' hideNavBar={true} type='reset' initial={true} >
                        <SideDrawer isDrawerOpen={this.state.isDrawerOpen}>
                            <Router
                                sceneStyle={styles.scene}
                                navigationBarStyle={styles.navigationBar}
                                titleStyle={styles.title} >
                                <Route name="DailyMenuPage" 
                                        component={connect(DailyMenuSelector)(DailyMenuPage)} 
                                        title="TODAY'S MENU" 
                                        renderLeftButton={this.renderDrawerButton.bind(this)} 
                                        renderRightButton={this.renderCartButton} />
                            </Router>
                        </SideDrawer>
                    </Route>

                    
                    <Route name="MenuDetailPage" component={connect(MenuDetailSelector)(MenuDetailPage)} 
                        title="TODAY'S MENU" wrapRouter={true}  navigationBarStyle={styles.navigationBar} 
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} 
                        renderRightButton={this.renderCartButton}/>

                    <Route name="CartPage" component={connect(CartSelector)(CartPage)} title="Cart"
                        wrapRouter={true}  navigationBarStyle={styles.navigationBar} 
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="ChefDetailPage" component={connect(ChefDetailSelector)(ChefDetailPage)}  
                        title="ChefDetailPage" wrapRouter={true}  navigationBarStyle={styles.navigationBar} 
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

                    <Route name="MyOrderPage" component={connect(MyOrderSelector)(MyOrderPage)}  
                        title="주문 내역" wrapRouter={true}  navigationBarStyle={styles.navigationBar} 
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="OrderDetailPage" component={connect(OrderDetailSelector)(OrderDetailPage)}  
                        title="주문 상세 보기" wrapRouter={true}  navigationBarStyle={styles.navigationBar} 
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />

                    <Route name="ReviewPage"  component={connect(ReviewSelector)(ReviewPage)} 
                        title="리뷰 남기기" wrapRouter={true}  navigationBarStyle={styles.navigationBar} 
                        titleStyle={styles.title} renderLeftButton={this.renderBackButton} />
                    
                </Router>
            </Provider>
        );
    }
}
let styles = StyleSheet.create({

    navigationBar: {
        backgroundColor: Color.PRIMARY_ORANGE,
    },
    title: {
        color: 'white',
    },
    leftButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    rightButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    image: {
        width: 20,
        height: 20,
    }
});
