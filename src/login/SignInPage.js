'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image, Dimensions, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Color from '../const/Color';
import Const from '../const/Const';
import PushNotification from '../app/PushNotification';
import RequestURL from '../const/RequestURL';
import realm from '../util/realm';
import userInfo from '../util/userInfo';

const KakaoManager = NativeModules.KakaoManager,
    FacebookManager = NativeModules.FacebookManager;


export default class SignInPage extends React.Component {
    constructor(props) {
        super(props);
    }
    facebookLogin() {

        console.log("trying facebook login");

        const signUp = this.signUp;

        FacebookManager.login().then((result) => {

            console.log("fb login success", result);

            const facebookSignUpParams = {
                "os_type": "iOS",
                "login_type": "fb",
                "user_id": result.id,
                "name": result.name,
                "push_token": PushNotification.deviceToken.token,
                "os_version": DeviceInfo.getSystemVersion(),
                "device": DeviceInfo.getModel(),
                "email": result.email,
            };

            console.log(facebookSignUpParams);

            signUp(facebookSignUpParams);

        }).catch((err) => {
            console.log(err);
        });
    }
    kakaoLogin() {

        console.log("kakao` login");

        const signUp = this.signUp;

        KakaoManager.login().then((result) => {

            console.log('success', result);

            let params = {
                "os_type": "iOS",
                "login_type": "kakao",
                "user_id": result.ID,
                "push_token": PushNotification.deviceToken.token,
                "os_version": DeviceInfo.getSystemVersion(),
                "device": DeviceInfo.getModel(),
                "nickname": result.properties.nickname,
            };

            signUp(params);

        }).catch((err) => {
            console.log(err);
        });
    }
    signUp(param) {
        console.log(`sign up body : ${JSON.stringify(param)}`);
        fetch(RequestURL.REQUEST_FB_SIGN_UP, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(param)
            })
            .then((response) => {
                console.log(response);
                return response.json()
            })
            .then((json) => {
                console.log('signUp successful!', json);
                const userIdx = json.user_info.user_idx;
                realm.write(() => {
                    userInfo.idx = parseInt(userIdx);
                });
                console.log(userInfo);

                Actions.DrawerPage();
            })
            .catch((error) => {
                console.warn('signUp Fail!!', error);

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
                        <TouchableHighlight onPress={Actions.DrawerPage} underlayColor={'transparent'}>
                            <Text style={[styles.textOrange, {fontSize: 14, marginTop: 10,}]}>로그인 없이 시작하기</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.textBox}>
                        <View style={styles.textBoxRow}>
                            <Text style={styles.textBlack}>회원가입과 동시에 플레이팅의</Text>
                            <TouchableHighlight onPress={Actions.CSEnquiryPage} underlayColor={'transparent'}>
                                <Text style={styles.textOrange}> 서비스 이용약관</Text>
                            </TouchableHighlight>
                        </View>
                        
                        <View style={styles.textBoxRow}>
                            <TouchableHighlight onPress={Actions.CSPolicyPage} underlayColor={'transparent'}>
                                <Text style={styles.textOrange}>개인정보 취급방침</Text>
                            </TouchableHighlight>
                            <Text style={styles.textBlack}>에 동의하시게 됩니다.</Text>
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
        resizeMode: 'contain'
    },
    contentBox: {
        flex: 1,
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
        width: 300,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
        fontSize: 10,
    },
    textOrange: {
        color: Color.PRIMARY_ORANGE,
        textDecorationLine: 'underline',
        fontSize: 10,
    }
});
