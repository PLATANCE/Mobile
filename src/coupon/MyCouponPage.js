'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, ListView, Text, StyleSheet, TouchableHighlight, Image, InteractionManager } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Color from '../const/Color';
import Const from '../const/Const';
import MyCouponList from './components/MyCouponList';
import RequestURL from '../const/RequestURL';
import PlaceholderView from '../commonComponent/PlaceholderView';
import {
  setCouponWillUse,
} from '../app/actions/CartInfoActions';
import {
  fetchCartInfo,
} from '../app/actions/CartInfoActions';
import userInfo from '../util/userInfo';


export default class MyCouponPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coupons: [],
            hasData: false,
            renderPlaceholderOnly: false,
        }
    }
    componentDidMount() {
        this.fetchMyCoupons();
    }
    fetchMyCoupons() {
        const userIdx = userInfo.idx;
        fetch(RequestURL.REQUEST_MY_COUPON_LIST + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.length > 0) {
                    this.setState({
                        coupons: responseData,
                        hasData: true,
                    });
                }
                InteractionManager.runAfterInteractions( () => {
                    this.setState({
                        renderPlaceholderOnly: true,
                    });
                })
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    renderPlaceholderView() {
        return (
          <PlaceholderView />
        );
    }
    loadingNoDataImage() {
        return (
            <TouchableHighlight onPress={Actions.ReferPage} underlayColor={'transparent'}>
                <View style={styles.container}>
                    <Image style={styles.img}
                        source={require('../order/img/no_coupon_data.png')} />
                </View>
            </TouchableHighlight>
        );
    }
    render() {
        const {
            disable,
            cart,
            dispatch,
            couponIdxWillUse,
            couponPriceWillUse,
            pointWillUse,
        } = this.props;

        if(!this.state.renderPlaceholderOnly) {
            return this.renderPlaceholderView();
        }
        if(!this.state.hasData) {
            return this.loadingNoDataImage();
        }
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <MyCouponList
                      coupons={this.state.coupons}
                      cart={cart}
                      pointWillUse={pointWillUse}
                      disable={disable}
                      onSetCouponWillUse={(couponIdxWillUse, couponPriceWillUse, pointWillUse) => dispatch(setCouponWillUse(couponIdxWillUse, couponPriceWillUse, pointWillUse))}
                      fetchCartInfo={(couponIdxWillUse) => dispatch(fetchCartInfo(couponIdxWillUse))}
                    />
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        marginTop: 10,
        flex: 1,
    },
    img: {
        width: Const.WIDTH,
        height: Const.HEIGHT,
        resizeMode: 'contain',
        backgroundColor: 'white',
    },
});
