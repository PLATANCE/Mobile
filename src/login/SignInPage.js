'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image, Dimensions, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import Color from '../const/Color';
import Const from '../const/Const';
import PushNotification from '../app/PushNotification';

const KakaoManager = NativeModules.KakaoManager,
    FacebookManager = NativeModules.FacebookManager;


export default class SignInPage extends React.Component {
    constructor(props) {
        super(props);
    }
    facebookLogin() {
        console.log("trying facebook login");
        FacebookManager.login().then((result) => {
            console.log("fb login success", result);

            let facebookSignUpParams = {
                "os_type": "iOS",
                "login_type": "fb",
                "user_id": result.id,
                "name": result.name,
                "push_token": PushNotification.deviceToken,
                "os_version": DeviceInfo.getSystemVersion(),
                "device": DeviceInfo.getModel(),
                "email": result.email
            };
            console.log(facebookSignUpParams);
                /*

                                                    request(.POST, "\(Constant.API_URL)/signup", parameters: params)
                                                        .responseJSON {
                                                            (_, _, result) in
                                                            switch result {
                                                                case .Success(let data):
                                                                    let result = JSON(data)
                                                                    let user_info = result["user_info"]

                                                                    let user_idx = user_info["user_idx"].intValue
                                                                    let by = result["from"].string!

                                                                        UserInfo.sharedInstance.set_user_idx(user_idx)




                                                                    if by == "i" { // insert

                                                                        Util.sharedInstance.mixPanel.createAlias("\(user_idx) - \(name)", forDistinctID: Util.sharedInstance.mixPanel.distinctId)
                                                                        UserInfo.sharedInstance.CreatedAlias()
                                                                        if login_type == "kakao" {
                                                                            Util.sharedInstance.track_action("Sign Up Success", properties: ["Type": "KakaoAPI"])
                                                                        } else if login_type == "facebook" {
                                                                            Util.sharedInstance.track_action("Sign Up Success", properties: ["Type": "FacebookAPI"])
                                                                        } else {
                                                                            Util.sharedInstance.track_action("Sign Up Success", properties: ["Type": "Auto"])
                                                                        }
                                                                    } else { // update
                                                                        if login_type == "kakao" {
                                                                            Util.sharedInstance.track_action("Log In Success", properties: ["Type": "KakaoAPI"])
                                                                        } else if login_type == "facebook" {
                                                                            Util.sharedInstance.track_action("Log In Success", properties: ["Type": "FacebookAPI"])
                                                                        } else {
                                                                            Util.sharedInstance.track_action("Log In Success", properties: ["Type": "Auto"])
                                                                        }
                                                                    }

                                                                    Util.sharedInstance.mixPanel.identify("\(user_idx) - \(name)")

                                                                    // AppsFlyerTracker.sharedTracker().



                                                                    Util.sharedInstance.mixPanel.people.set(["name": "\(user_idx) - \(name)"])
                                                                    Util.sharedInstance.mixPanel.people.set(["media_source": UserInfo.sharedInstance.appsflyer_media_source(), "campaign": UserInfo.sharedInstance.appsflyer_campaign()])



                                                                    if UserInfo.push_token_nsdata != nil {
                                                                        Util.sharedInstance.mixPanel.people.addPushDeviceToken(UserInfo.push_token_nsdata)
                                                                    }




                                                                    self.dismissViewControllerAnimated(true, completion: nil)
                                                                    self.SignUP("facebook", name: FBSDKProfile.currentProfile().name, params: parameters3)
                            */
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
