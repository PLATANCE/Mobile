'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight } from 'react-native';

import Color from '../const/Color';
import Const from '../const/Const';
import MyOrderList from './components/MyOrderList';
import RequestURL from '../const/RequestURL';

import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;

export default class MyOrderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderHistory: [],
        }
    }
    componentDidMount() {
        this.fetchMyOrders();
    }
    fetchMyOrders() {
        fetch(RequestURL.REQUEST_MY_ORDER_LIST + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    orderHistory: responseData.order_history
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <MyOrderList orders={this.state.orderHistory}/>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
        marginTop: Const.MARGIN_TOP,
    },
    content: {
        flex: 1,
        marginTop: 10,
    },
});