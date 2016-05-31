'use strict';
import React, {
    Component,
} from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, Dimensions, NativeModules, Platform, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import PushNotification from '../app/PushNotification';
import RequestURL from '../const/RequestURL';
import realm from '../util/realm';
import userInfo from '../util/userInfo';
import Mixpanel from '../util/mixpanel';

const platform = Platform.OS === 'android' ? 'android' : 'ios';

const KakaoManager = NativeModules.KakaoManager,
    FacebookManager = NativeModules.FacebookManager;

/*
let facebookID;
let kakaoID;
let autoSignUpID = DeviceInfo.getUniqueID();
FacebookManager.getID()
  .then((id) => {facebookID = id;})
  .catch((err) => console.log(err))
  .then(() => {
    KakaoManager.getID()
      .then((id) => {kakaoID = id;})
      .catch((err) => console.log(err))
      .then(() => {
        fetch( test )
      });
  });*/


export default class SignInPage extends Component {
    constructor(props) {
        super(props);
    }
    facebookLogin() {
        Mixpanel.trackWithProperties('Click Sign Up', { via: 'Facebook' });
        const signUp = this.signUp;

        FacebookManager.login().then((result) => {

            Mixpanel.trackWithProperties('Sign Up Success', { via: 'Facebook' });

            const facebookSignUpParams = {
                "os_type": "iOS",
                "login_type": "fb",
                "user_id": result.id,
                "name": result.name,
                "push_token": PushNotification.deviceToken,
                "os_version": DeviceInfo.getSystemVersion(),
                "device": DeviceInfo.getModel(),
                "email": result.email,
            };

            signUp(facebookSignUpParams);

        }).catch((err) => {
            console.log(err);
        });
    }
    kakaoLogin() {
        Mixpanel.trackWithProperties('Click Sign Up', { via: 'Kakao' });
        const signUp = this.signUp;

        KakaoManager.login().then((result) => {  

            let params = {
                "os_type": "iOS",
                "login_type": "kakao",
                "user_id": result.ID,
                "push_token": PushNotification.deviceToken,
                "os_version": DeviceInfo.getSystemVersion(),
                "device": DeviceInfo.getModel(),
                "nickname": result.properties.nickname,
                "profile_image": result.properties.profile_image,
                "thumbnail_image": result.properties.thumbnail_image,
            };
            signUp(params);

        }).catch((err) => {
            console.log(err);
        });
    }
    autoLogin() {
        Mixpanel.trackWithProperties('Click Sign Up', { via: 'Auto' });
        const signUp = this.signUp;

        let params = {
                "os_type": "iOS",
                "login_type": "auto",
                "user_id": DeviceInfo.getUniqueID(),
                "name": "",
                "push_token": PushNotification.deviceToken,
                "os_version": DeviceInfo.getSystemVersion(),
                "device": DeviceInfo.getModel(),
                "device_name": DeviceInfo.getDeviceName(),
                "email": "",
            };
        signUp(params);
    }
    signUp(param) {
        //console.log(`sign up body : ${JSON.stringify(param)}`);
        fetch(RequestURL.REQUEST_FB_SIGN_UP, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(param)
            })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                const userIdx = json.user_info.user_idx;
                const signUpOrLogin = json.from;
                const name = (param.login_type === 'kakao') ? param.nickname : param.name;
                const uniqueID = userIdx.toString();

                Mixpanel.createAlias(uniqueID);
                Mixpanel.identify(uniqueID);
                Mixpanel.set("$name", uniqueID);
                
                if(param.login_type === 'kakao') {
                    Mixpanel.trackWithProperties('Sign Up Success', { via: 'Kakao' });
                } else if(param.login_type === 'fb') {
                    Mixpanel.trackWithProperties('Sign Up Success', { via: 'Facebook' });
                } else {
                    Mixpanel.trackWithProperties('Sign Up Success', { via: 'Auto' });
                }
                
                realm.write(() => {
                    userInfo.idx = parseInt(userIdx);
                });
                //console.log(userInfo);
                if(signUpOrLogin == 'i') {
                    Alert.alert(
                        'Welcome to Plating!',
                        "신규가입 1만원 할인 쿠폰이 지급되었습니다.\n'내쿠폰함'을 확인해보세요.",
                    );
                }
                Actions.drawer({type: 'reset'});
            })
            .catch((error) => {
                console.warn('signUp Fail!!', error);
                Mixpanel.track('Sign Up Fail');

                // TODO
                // 에러창 띄어야 함.
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img}
                    source={require('../commonComponent/img/login_main.jpg')}/>
                <View style={styles.contentBox} >
                    <View style={styles.buttonBox}>
                        <TouchableHighlight onPress={this.facebookLogin.bind(this)} underlayColor={'transparent'}>
                            <Image style={styles.button}
                                source={require('./img/fb.png')} />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.kakaoLogin.bind(this)} underlayColor={'transparent'}>
                            <Image style={styles.button}
                                source={require('./img/kakao.png')} />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.autoLogin.bind(this)} underlayColor={'transparent'}>
                            <Text style={[Font.DEFAULT_FONT_ORANGE_UNDERLINE, {fontSize: normalize(14),marginTop: 10,}]}>로그인 없이 시작하기</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.textBox}>
                        <View style={styles.textBoxRow}>
                            <Text style={[Font.DEFAULT_FONT_BLACK], {fontSize: normalize(10)}}>회원가입과 동시에 플레이팅의</Text>
                            <TouchableHighlight onPress={() => Actions.CSPolicyPage({uri: 'http://api.plating.co.kr/app/term.html', page: 'servicePolicy'})} underlayColor={'transparent'}>
                                <Text style={[Font.DEFAULT_FONT_ORANGE_UNDERLINE, {fontSize: normalize(10)}]}> 서비스 이용약관</Text>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.textBoxRow}>
                            <TouchableHighlight onPress={() => Actions.CSPolicyPage({uri: 'http://api.plating.co.kr/app/privacy.html', page: 'privacyPolicy'})} underlayColor={'transparent'}>
                                <Text style={[Font.DEFAULT_FONT_ORANGE_UNDERLINE, {fontSize: normalize(10),}]}>개인정보 취급방침</Text>
                            </TouchableHighlight>
                            <Text style={[Font.DEFAULT_FONT_BLACK], {fontSize: normalize(10)}}>에 동의하시게 됩니다.</Text>
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: Const.WIDTH,
        height: Const.HEIGHT * 0.6,
        resizeMode: 'cover'
    },
    contentBox: {
        flex: 1,
        width: Const.WIDTH,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    buttonBox: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBox: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBoxRow: {
        flexDirection: 'row',
    },
    button: {
        width: normalize(300),
        height: normalize(50),
        resizeMode: 'contain',
        marginBottom: 10,
    },
});
