'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, Clipboard, Alert, Linking, LinkingIOS, NativeModules } from 'react-native';
import Communications from 'react-native-communications';

import Color from '../const/Color';
import Const from '../const/Const';
import Font from '../const/Font';
import MediaURL from '../const/MediaURL';
import RequestURL from '../const/RequestURL';

import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;
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
        }
    }
    componentDidMount() {
        this.fetchMyUserCode();
        this.getReferPolicy();
    }
    fetchMyUserCode() {
        fetch(RequestURL.REQUEST_GET_USER_CODE + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
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
                console.log(responseData);
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
    }
    showDetailDialog() {
        /*
            title: 친구를 초대하세요!
            content: 초대받은 친구가 추천 코드를 입력하고 첫 주문을 하면, 초대하신 분께 5천원 포인트를 드립니다.
        */
        Alert.alert(
            '친구를 초대하세요!',
            '초대받은 친구가 추천 코드를 입력하고 첫 주문을 하면, 초대하신 분께 ' + this.state.pointPriceKor + ' 포인트를 드립니다',
        );
    }
    onPressKakao(content) {
      console.log(content);
      KakaoManager.openKakaoTalkAppLink('Plating 열기', content);
    }
    onPressMMS(content) {
        const url = '&body=' + content;
        Communications.text(url);
    }
    render() {
        /*
            셰프의 요리를 집에서 즐겨요! 지금 플레이팅 앱을 다운받고 첫 주문 5천원 할인 받으세요.
            다운로드 링크: http://goo.gl/t5lrSL
            추천인 코드: {코드}
        */

        let url = MediaURL.REFER_URL + this.state.url;
        let clipboardContent = '셰프의 요리를 집에서 즐겨요! 지금 플레이팅 앱을 다운받고 첫 주문 ' + this.state.pointPriceKor + ' 포인트를 드립니다.\n'
                            + '다운로드 링크: http://goo.gl/t5lrSL\n'
                            + '추천인 코드: ' + this.state.userCode;
        let kakaoContent = '셰프의 요리를 집에서 즐겨요! 지금 플레이팅 앱을 다운받고 첫 주문 ' + this.state.pointPriceKor + ' 포인트를 드립니다.\n'
                            + '추천인 코드: ' + this.state.userCode;

        return (
            <View style={styles.container}>
                <View style={styles.imageBox}>
                    <Image style={styles.referImage}
                        source={{uri: url}} />
                </View>
                <View style={styles.codeBox}>
                    <View style={styles.codeTextBox}>
                        <Text style={styles.codeText}>{this.state.userCode}</Text>
                    </View>
                    <View style={styles.detailTextBox}>
                        <Text style={Font.DEFAULT_FONT_WHITE}>친구가 첫 주문을 하면</Text>
                        <View style={styles.detailTextFooterBox}>
                            <Text style={Font.DEFAULT_FONT_WHITE}>나에게도 {this.state.pointPriceNum}이 바로 적립!</Text>
                            <TouchableHighlight onPress={() => this.showDetailDialog()}>
                                <Text style={[styles.textDetail, Font.DEFAULT_FONT_ORANGE]}>자세히</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
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
        flex: 5,
    },
    referImage: {
        flex: 1,
    },
    codeBox: {
        flex: 3,
        backgroundColor: Color.REFER_BACKGROUND
    },
    codeTextBox: {
        borderWidth: 2,
        borderColor: Color.PRIMARY_ORANGE,
        flex: 2,
        marginTop: 20,
        marginBottom: 0,
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    codeText: {
        color: Color.PRIMARY_ORANGE,
        fontSize: 50 * Const.DEVICE_RATIO,
        fontWeight: 'bold',
    },
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
        fontSize: 16 * Const.DEVICE_RATIO,
    },
    textDetail: {
        textDecorationLine: 'underline',
        fontSize: 18 * Const.DEVICE_RATIO,
        marginLeft: 5,
    },
    methodBox: {
        flex: 2,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50 * Const.DEVICE_RATIO,
        paddingRight: 50 * Const.DEVICE_RATIO,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    method: {
        marginLeft: 20 * Const.DEVICE_RATIO,
        marginRight: 20 * Const.DEVICE_RATIO,
        alignItems: 'center',
        justifyContent: 'center',
    },
    methodImage: {
        width: 70 * Const.DEVICE_RATIO,
        height: 70 * Const.DEVICE_RATIO,
        resizeMode: 'contain',
    }
});
