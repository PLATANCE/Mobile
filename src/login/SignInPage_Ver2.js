'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Color from '../const/Color';
import Const from '../const/Const';


export default class SignInPage extends React.Component {
    fbLogin() {
        console.log("facebook login");
    }

    kakaoLogin() {
        console.log("kakao login");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.contentBox}>
                        <Image style={styles.imageLogo}
                            source={require('../commonComponent/img/plating_logo.png')} />
                    </View>
                    <View style={styles.contentBox}>
                        <View style={[styles.row, styles.backgroundColorWhite]}>
                            <Image style={styles.image} 
                                source={require('./img/mail.png')}/>
                            <TextInput style={styles.textInput} 
                                keyboardType={'email-address'} 
                                autoCorrect={false}
                                placeholder={'E-mail address'}/>
                        </View>
                        <View style={[styles.row, styles.backgroundColorWhite]}>
                            <Image style={styles.image} 
                                source={require('./img/password.png')}/>
                            <TextInput style={styles.textInput}
                                secureTextEntry={true}
                                placeholder={'********'}/>
                        </View>
                        <View style={[styles.row, styles.backgroundColorOrange, {marginTop: 10,}]}>
                            <Text style={styles.textWhite}>로그인</Text>
                        </View>
                    </View>
                    <View style={styles.contentBox}>
                        <View style={[styles.row, styles.backgroundColorFB, {marginTop: 10,}]}>
                            <Image style={styles.buttonLogo}
                                source={require('./img/facebook.png')}/>
                            <Text style={styles.textWhite}>페이스북으로 로그인   </Text>
                        </View>
                        <View style={[styles.row, styles.backgroundColorKakao, {marginTop: 10,}]}>
                            <Image style={styles.buttonLogo}
                                source={require('./img/kakaotalk.png')}/>
                            <Text style={styles.textWhite}>카카오계정으로 로그인</Text>
                        </View>
                        <View style={[styles.row, styles.backgroundColorTransparent, {marginTop: 10,}]}>
                            <TouchableHighlight style={[styles.textButton, {alignItems: 'flex-start'}]} underlayColor={'transparent'} 
                                onPress={Actions.SignUpPage} >
                                <Text style={styles.textWhite}>회원가입</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={[styles.textButton, {alignItems: 'flex-end'}]} underlayColor={'transparent'}>
                                <Text style={styles.textWhite}>비밀번호를 잊어버리셨어요?</Text>
                            </TouchableHighlight>
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
        backgroundColor: 'orange',
    },
    content: {
        margin: 30,
        flex: 1,
    },
    contentBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        borderRadius: 5,
        borderWidth: 1,
        overflow: 'hidden',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'stretch',
    },
    image: {
        width: 30,
        height: 30,
    },
    imageLogo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
    },
    textButton: {
        flex: 1,
        alignSelf: 'flex-end',
    },
    buttonLogo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 20,
    },
    backgroundColorWhite: {
        backgroundColor: 'white',
        borderColor: 'white',
    },
    backgroundColorOrange: {
        backgroundColor: Color.PRIMARY_ORANGE,
        borderColor: Color.PRIMARY_ORANGE,
    },
    backgroundColorFB: {
        backgroundColor: Color.PRIMARY_FACEBOOK,
        borderColor: Color.PRIMARY_FACEBOOK,
    },
    backgroundColorKakao: {
        backgroundColor: Color.PRIMARY_KAKAOTALK,
        borderColor: Color.PRIMARY_KAKAOTALK,
    },
    backgroundColorTransparent: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    textWhite: {
        color: 'white',
        fontWeight: 'bold',
    }
});
