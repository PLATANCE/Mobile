'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Color from '../const/Color';
import Const from '../const/Const';
import MyCouponList from './components/MyCouponList';
import RequestURL from '../const/RequestURL';
import {
  useCoupon,
} from '../app/actions/CartInfoActions';
import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;

export default class MyCouponPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coupons: [],
            hasData: false,
        }
    }
    componentDidMount() {
        this.fetchMyCoupons();
    }
    fetchMyCoupons() {
        fetch(RequestURL.REQUEST_MY_COUPON_LIST + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.length > 0) {
                    this.setState({
                        coupons: responseData,
                        hasData: true,
                    });
                }
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    loadingNoDataImage() {
        return (
            <TouchableHighlight onPress={Actions.DrawerPage} underlayColor={'transparent'}>
                <View style={styles.container}>
                    <Image style={styles.img}
                        source={require('../order/img/no_data.png')} />
                </View>
            </TouchableHighlight>
        );
    }
    render() {
        const {
            disable,
            cart,
            dispatch,
        } = this.props;
        if(!this.state.hasData) {
            return this.loadingNoDataImage();
        }
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <MyCouponList
                      coupons={this.state.coupons}
                      cart={cart}
                      disable={disable}
                      onUseCoupon={(couponIdx, discountCouponPrice) => dispatch(useCoupon(couponIdx, discountCouponPrice))}
                    />
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Const.MARGIN_TOP,
        backgroundColor: Color.PRIMARY_BACKGROUND,
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
