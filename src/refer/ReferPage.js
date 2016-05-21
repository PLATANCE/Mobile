'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, Clipboard, Alert, Linking, LinkingIOS, NativeModules } from 'react-native';
import Communications from 'react-native-communications';

import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import MediaURL from '../const/MediaURL';
import RequestURL from '../const/RequestURL';

import userInfo from '../util/userInfo';
import Mixpanel from '../util/mixpanel';

const KakaoManager = NativeModules.KakaoManager;

export default class ReferPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCode: '',
            url: 'refer_top.jpg',
            pointPriceKor: '',
            pointPriceNum: '',
            clipboardContent: '',
            readDetail: props.readDetail,
        }
    }
    componentDidMount() {
        this.fetchMyUserCode();
        this.getReferPolicy();
    }

    componentWillUnmount() {
        Mixpanel.trackWithProperties('View Refer Screen', { readDetail: this.state.readDetail, });
    }

    fetchMyUserCode() {
        const userIdx = userInfo.idx;
        fetch(RequestURL.REQUEST_GET_USER_CODE + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                //console.log(responseData);
                this.setState({
                    userCode: responseData.user_code,
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    getReferPolicy() {
        fetch(RequestURL.REQUEST_GET_POLICY_REFER_POINT)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    pointPriceKor: responseData.korReferPoint,
                    pointPriceNum: responseData.numReferPoint,
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    async setClipboardContent(content) {
        Clipboard.setString(content);
        try {
            var content = await Clipboard.getString();
            this.setState({
                clipboardContent: content,
            });
        } catch(e) {
            this.setState({
                clipboardContent: e.message
            });
        }
        Alert.alert(
            '복사 완료',
            '붙여넣기로 친구에게 공유해주세요 :)',
        );
        Mixpanel.trackWithProperties('Refer Button', { via: 'URL' });
    }
    onPressKakao(content) {
      KakaoManager.openKakaoTalkAppLink('Plating 열기', content);
      Mixpanel.trackWithProperties('Refer Button', { via: 'Kakao' });
    }
    onPressMMS(content) {
        const url = '&body=' + content;
        Communications.text(url);
        Mixpanel.trackWithProperties('Refer Button', { via: 'SMS' });
    }
    render() {
        /*
            셰프의 요리를 집에서 즐겨요! 지금 플레이팅 앱을 다운받고 첫 주문 5천원 할인 받으세요.
            다운로드 링크: http://goo.gl/t5lrSL
            추천인 코드: {코드}
        */
        const userCode = this.state.userCode;
        let url = MediaURL.REFER_URL + this.state.url;
        let clipboardContent = '오늘 저녁 뭐 먹지? 고민은 그만! 지금 바로 플레이팅 하세요 :) 첫 주문 ' + this.state.pointPriceKor + ' 쿠폰 증정.\n'
                            + '[추천인 코드: ' + userCode + ']';
                            + '다운로드 링크: http://goo.gl/t5lrSL\n';
                            
        let kakaoContent = '오늘 저녁 뭐 먹지? 고민은 그만! 지금 바로 플레이팅 하세요 :) 첫 주문 ' + this.state.pointPriceKor + ' 쿠폰 증정.\n'
                            + '[추천인 코드: ' + userCode + ']';

        return (
            <View style={styles.container}>
                <View style={styles.imageBox}>
                    <Image style={styles.referImage}
                        source={{uri: url}} />
                </View>
                <View style={styles.methodBox}>
                    <TouchableHighlight underlayColor={'transparent'} onPress={ () => this.onPressKakao(kakaoContent) } >
                    <View style={styles.method}>
                        <Image style={styles.methodImage}
                            source={require('./img/refer_kakao_icon.png')}/>
                        <Text style={Font.DEFAULT_FONT_BLACK}>카카오톡</Text>
                    </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'transparent'} onPress={ () => this.onPressMMS(clipboardContent) }>
                    <View style={styles.method}>
                        <Image style={styles.methodImage}
                            source={require('./img/refer_sms_icon.png')}/>
                        <Text style={Font.DEFAULT_FONT_BLACK}>문자</Text>
                    </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.setClipboardContent(clipboardContent)} underlayColor={'transparent'}>
                    <View style={styles.method}>
                        <Image style={styles.methodImage}
                            source={require('./img/refer_url_icon.png')}/>
                        <Text style={Font.DEFAULT_FONT_BLACK}>URL 복사</Text>
                    </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Const.MARGIN_TOP,
    },
    imageBox: {
        flex: 8,
    },
    referImage: {
        flex: 1,
        resizeMode: 'contain',
    },
    arrowImage: {
        width: normalize(30),
        height: normalize(30),
        marginTop: normalize(10),
        resizeMode: 'contain',
    } ,
    detailTextBox: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailTextFooterBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textWhite: {
        fontSize: normalize(16),
    },
    textDetail: {
        textDecorationLine: 'underline',
        fontSize: normalize(18),
        marginLeft: 5,
    },
    methodBox: {
        flex: 2,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: normalize(50),
        paddingRight: normalize(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    method: {
        marginLeft: normalize(20),
        marginRight: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    methodImage: {
        width: normalize(70),
        height: normalize(70),
        resizeMode: 'contain',
    }
});
