'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, Text, StyleSheet, WebView, Alert, Platform} from 'react-native';
import { Actions } from 'react-native-router-flux';
import sha256 from 'sha256';
import Const from '../const/Const';

import userInfo from '../util/userInfo';
import {
  fetchCartInfo,
} from '../app/actions/CartInfoActions';

export default class AddCardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: 'http://inilite.inicis.com/inibill/inibill_card.jsp?',
        };
    }

    pad2(n) {
        return ((n < 10) ? '0' : '') + n;
    }
    YYYYMMDDHHMMSS(date) {
        return date.getFullYear() + 
            this.pad2(date.getMonth() + 1) +
            this.pad2(date.getDate()) + 
            this.pad2(date.getHours()) + 
            this.pad2(date.getMinutes()) +
            this.pad2(date.getSeconds());
    }
    onShouldStartLoadWithRequest(event) {
        const url = event.url;
        //console.log(url);
        if(Platform.OS === 'ios') {
            if(url.indexOf('jscall:') != -1) {
                console.log(url + url.indexOf('jscall:'))
                const isSuccess = url.split('?')[1];
                if(isSuccess === 'success') {
                    Alert.alert(
                        '카드 등록 성공!',
                        '결제를 진행해 주세요 :)',
                        [
                            { text: 'OK', onPress: () => { Actions.pop(); this.props.dispatch(fetchCartInfo(this.props.couponIdx)); } }
                        ]
                    );
                } else {
                    Alert.alert(
                        '카드 등록 실패!',
                        '카드 정보를 다시 한번 확인해주세요 :)',
                        [
                            { text: 'OK', onPress: () => { Actions.pop() } }
                        ]

                    );
                }
                return false;
            }
            return true;
        } else {
            alert(url);
        }
    }
    onNavigationStateChange(navState) {
        const {
            dispatch,
        } = this.props;
        const url = navState.url;
        const loading = navState.loading;
        if(url.indexOf('bk_len') != -1 && !loading) {
            const cardResultNumber = parseInt(url.substring(url.length - 2, url.length));
            if(cardResultNumber === 40) {
                Alert.alert(
                    '카드 등록 성공!',
                    '결제를 진행해 주세요 :)',
                    [
                        { text: 'OK', onPress: () => { Actions.pop(); this.props.dispatch(fetchCartInfo(this.props.couponIdx)); } }
                    ]
                );
            } else {
                Alert.alert(
                    '카드 등록 실패!',
                    '카드 정보를 다시 한번 확인해주세요 :)',
                    [
                        { text: 'OK', onPress: () => { Actions.pop() } }
                    ]
                );
            }
        }
    }
    /*
     * http://inilite.inicis.com/inibill/inibill_card.jsp?
     * mid=plating001
     * buyername=1708               // userIdx
     * goodname=플레이팅 카드등록
     * price=0
     * orderid=1459679139389_1708   // currentTimeMillis + _ + userIdx
     * returnurl=http://api.plating.co.kr/payResult
     * timestamp=20160403192539
     * period=
     * p_noti=1708-43   // userIdx + - + versionCode
     * hashdata=058f576e2eae01d51d45be8f32c7aebec0d269a85e5c9c1fe0dea7e79ea6058a // sha256(mid + orderid + timestamp + merchantkey)
     */
    // merchantkey = "V0pLcWJOR2RpYWx6ZjBxMUkzRXRVQT09";

    render() {
        let uri = this.state.uri;
        const userIdx = userInfo.idx;
        const mId = 'plating001';
        const buyerName = userIdx;
        const goodName = '플레이팅 카드등록';
        const price = 0;
        const orderId = new Date().getTime() + '_' + userIdx;
        const returnUrl = Platform.OS === 'ios' ? 'http://api.plating.co.kr/payResult_iOS' : 'http://api.plating.co.kr/payResult';
        const timeStamp = this.YYYYMMDDHHMMSS(new Date());
        const period = '';
        const pNoti = userIdx;
        const merchantkey = "V0pLcWJOR2RpYWx6ZjBxMUkzRXRVQT09";
        const hashData = sha256(mId + orderId + timeStamp + merchantkey);

        uri += 'mid=' + mId;
        uri += '&buyername=' + buyerName;
        uri += '&goodname=' + goodName;
        uri += '&price=' + price;
        uri += '&orderid=' + orderId;
        uri += '&returnurl=' + returnUrl;
        uri += '&timestamp=' + timeStamp;
        uri += '&period=' + period;
        uri += '&p_noti=' + pNoti;
        uri += '&hashdata=' + hashData;

        //http://inilite.inicis.com/inibill/inibill_card.jsp?mid=plating001&buyername=1708&goodname=플레이팅 카드등록&price=0&orderid=1459679139389_1708&returnurl=http://api.plating.co.kr/payResult&timestamp=20160403192539&period=&p_noti=1708-43&hashdata=058f576e2eae01d51d45be8f32c7aebec0d269a85e5c9c1fe0dea7e79ea6058a,

        return (
            <View style={styles.container}>
                <WebView 
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{ uri: uri }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    webView: {
        width: Const.WIDTH,
    }
});
