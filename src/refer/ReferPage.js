'use strict';
import React, {
    Component,
    PropTypes,
} from 'react';
import { View, ListView, Text, StyleSheet, TouchableHighlight, Image, Clipboard, Alert, Platform, NativeModules } from 'react-native';
import Communications from 'react-native-communications';

import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import MediaURL from '../const/MediaURL';
import RequestURL from '../const/RequestURL';

import userInfo from '../util/userInfo';
import Mixpanel from '../util/mixpanel';
import CommunicationsAndroid from '../commonComponent/CommunicationsAndroid';

const KakaoManager = NativeModules.KakaoManager;

export default class ReferPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCode: '',
            //source={{uri: "http://plating.co.kr/app/media/banner/admin_banner_ver2.png?t=" + Math.round(new Date().getTime() / 1000)}} />
            refer_image: 'new_refer_friend.png?t=' + Math.round(new Date().getTime() / 1000),
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
        if(Platform.OS === 'ios') {
            Communications.text('&body=' + content);
        }  else {
            CommunicationsAndroid.text(content)
        }
        Mixpanel.trackWithProperties('Refer Button', { via: 'SMS' });
    }

    render() {
        /*
         *  클립보드는 추천 + 다운로드
         *  나머지는 추천
         */
        const { userCode, refer_image } = this.state;
        const url = MediaURL.REFER_URL + refer_image;
        const clipboardContent = '집에서 간편하게 셰프의 요리를 즐기는 방법-'
          + '\n1. 지금 플레이팅 앱을 다운받고 주문하세요.'
          + '\n[다운로드 링크: http://goo.gl/t5lrSL]'
          + '\n2. 친구 고유코드를 입력하면 5,000원 할인!'
          + '\n[추천 코드: ' + userCode + ']';
        const kakaoContent = '집에서 간편하게 셰프의 요리를 즐기는 방법-'
          + '\n1. 지금 플레이팅 앱을 다운받고 주문하세요.'
          + '\n2. 친구 고유코드를 입력하면 5,000원 할인!'
          + '\n[추천 코드: ' + userCode + ']';
        return (
            <View style={styles.container}>
                <View style={styles.imageBox}>
                    <Image style={styles.referImage}
                        source={{uri: url}}
                        resizeMode={'cover'} />
                </View>
                <View style={styles.codeBox} >
                    <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>친구들에게 나의 플레이팅 <Text style={{textDecorationLine: 'underline'}}>고유코드</Text>를 공유해보세요:</Text>
                    <Text style={[Font.DEFAULT_FONT_ORANGE_BOLD, {fontSize: normalize(40)}]}>{this.state.userCode}</Text>
                </View>
                <View style={styles.methodBox} >
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
    },
    imageBox: {
        flex: 6,
    },
    referImage: {
        flex: 1,
        resizeMode: 'contain',
    },
    codeBox: {
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: normalize(30),
        marginRight: normalize(30),
        marginTop: normalize(20),
        borderColor: '#E4E4E4',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
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
        paddingBottom: normalize(10),
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
