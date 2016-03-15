'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image, Dimensions, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';

const KakaoManager = NativeModules.KakaoManager,
    FacebookManager = NativeModules.FacebookManager;

import Color from '../const/Color';
import Const from '../const/Const';

export default class SignInPage extends React.Component {
    constructor(props) {
        super(props);
    }
    facebookLogin() {
        console.log("facebook login");
        FacebookManager.login().then(() => {
            console.log('success');
        }).catch((err) => {
            console.log(err);
        });
    }
    kakaoLogin() {
        console.log("kakao` login");
        KakaoManager.login().then(() => {
            console.log('success');
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} 
                    source={require('../commonComponent/img/login_main.jpg')}/>
                <View style={styles.contentBox} >
                    <View style={styles.buttonBox}>
                        <TouchableHighlight onPress={this.facebookLogin} underlayColor={'transparent'}>
                            <Image style={styles.button} 
                                source={require('./img/fb.png')} />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.kakaoLogin} underlayColor={'transparent'}>
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
