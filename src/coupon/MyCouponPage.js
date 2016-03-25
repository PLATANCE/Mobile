'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import MyCouponList from './components/MyCouponList';
import RequestURL from '../const/RequestURL';

import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;

export default class MyCouponPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coupons: [],
        }
    }
    componentDidMount() {
        this.fetchMyCoupons();
    }
    fetchMyCoupons() {
        fetch(RequestURL.REQUEST_MY_COUPON_LIST + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    coupons: responseData
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    render() {
        const {
            disable,
            cart,
        } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <MyCouponList coupons={this.state.coupons} cart={cart} disable={disable}/>
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
});