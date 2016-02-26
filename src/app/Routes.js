'use strict';
import React, { Component, AppRegistry, Navigator, StyleSheet, Text, View, Image } from 'react-native';
import ReactNativeRouter, { Route, Schema, Animations, TabBar } from 'react-native-router-flux';

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

export default class Routes extends Component {
    renderDrawerButton() {
        return (
            <View style={styles.leftButton}>
                <Image style={styles.image}
                    source={require('../commonComponent/img/drawer_white.png')}/>
            </View>
        );
    }
    renderCartButton() {
        return (
            <View style={styles.rightButton}>
                <Image style={styles.image}
                    source={require('../commonComponent/img/cart_white.png')}/>
            </View>
        );
    }
    renderBackButton() {
        return (
            <View style={styles.leftButton}>
                <Image style={styles.image}
                    source={require('../commonComponent/img/back_white.png')}/>
            </View>
        );
    }
    render() {
        return (
            <Provider store={store}>
                <Router hideNavBar={true}>
                    <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                    <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                    <Schema name="withoutAnimation"/>

                    <Route name="DailyMenuPage" component={connect(DailyMenuSelector)(DailyMenuPage)} 
                        initial={true} wrapRouter={true} title="TODAY'S MENU" 
                        navigationBarStyle={styles.navigationBar} titleStyle={styles.title} 
                        renderLeftButton={this.renderDrawerButton} 
                        renderRightButton={this.renderCartButton} />

                    <Route name="MenuDetailPage"  component={connect(MenuDetailSelector)(MenuDetailPage)}  wrapRouter={true} title="TODAY'S MENU" navigationBarStyle={styles.navigationBar} titleStyle={styles.title}/>
                    <Route name="CartPage"  component={connect(CartSelector)(CartPage)}  title="CartPage"/>
                    <Route name="ChefDetailPage" component={connect(ChefDetailSelector)(ChefDetailPage)}  title="ChefDetailPage"/>

                    <Route name="MyAddressPage"  component={connect(MyAddressSelector)(MyAddressPage)}  title="MyAddressPage"/>
                    <Route name="AddAddressPage"  component={connect(AddAddressSelector)(AddAddressPage)}  title="AddAddressPage"/>
                    <Route name="AddressCoveragePage" component={connect(AddressCoverageSelector)(AddressCoveragePage)}  title="AddressCoveragePage"/>

                    <Route name="ReferPage"  component={connect(ReferSelector)(ReferPage)}  title="ReferPage"/>
                    <Route name="MyPointPage"  component={connect(MyPointSelector)(MyPointPage)}  title="MyPointPage"/>
                    <Route name="MyCouponPage"  component={connect(MyCouponSelector)(MyCouponPage)}  title="MyCouponPage"/>
                    <Route name="MyOrderPage"  component={connect(MyOrderSelector)(MyOrderPage)}  title="MyOrderPage"/>
                    <Route name="OrderDetailPage"  component={connect(OrderDetailSelector)(OrderDetailPage)}  title="OrderDetailPage"/>
                    <Route name="ReviewPage"  component={connect(ReviewSelector)(ReviewPage)}  title="ReviewPage"/>
                </Router>
            </Provider>
        );
    }
}
let styles = StyleSheet.create({
    navigationBar: {
        backgroundColor: Color.PRIMARY_ORANGE
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
