'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Mixpanel from '../util/mixpanel';
import DeviceInfo from 'react-native-device-info';
import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import Font from '../const/Font';
import Swiper from 'react-native-swiper';
import userInfo from '../util/userInfo';
import realm from '../util/realm';

const KakaoManager = NativeModules.KakaoManager,
    FacebookManager = NativeModules.FacebookManager;

export default class TutorialPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showsPagination: true,
            pageIndex: 0
        };
    }

    componentDidMount() {
        let facebookID;
        let kakaoID;
        let autoSignUpID = DeviceInfo.getUniqueID();
        FacebookManager.getID()
          .then((id) => {facebookID = id; console.log(id);})
          .catch((err) => console.log(err))
          .then(() => {
            KakaoManager.getID()
              .then((id) => {kakaoID = id;})
              .catch((err) => console.log(err))
              .then(() => {
                let url = `${RequestURL.CHECK_ALREADY_SIGNED_UP}/?autoSignUpID=${autoSignUpID}`;
                console.log(url);
                if (facebookID) {
                    url += `&facebookID=${facebookID}`;
                }
                if (kakaoID) {
                    url += `&kakaoID=${kakaoID}`;
                }
                fetch(url)
                    .then((response) => response.json())
                    .then((json) => {
                        if(json.userIdx) {
                            const userIdx = json.userIdx
                            const uniqueID = userIdx.toString();
                            Mixpanel.createAlias(uniqueID);
                            Mixpanel.identify(uniqueID);
                            Mixpanel.set("$name", uniqueID);

                            realm.write(() => {
                                userInfo.idx = parseInt(userIdx);
                            });

                            Actions.DrawerPage();
                        }
                    })
                    .catch((error) => {
                        console.warn(error);
                    })
              });
          });
    }

    _onMomentumScrollEnd(e, state, context) {
        if (context.state.index == context.state.total - 1) {
            this.setState({
                showsPagination: false,
                pageIndex: state.index
            });
            Mixpanel.trackWithProperties('(Screen) Tutorial', { finished: 'true' });
        } else {
            this.setState({
                showsPagination: true,
                pageIndex: state.index
            });
            Mixpanel.trackWithProperties('(Screen) Tutorial', { finished: 'false' });
        }
    }

    render() {
        return (
            <Swiper style={styles.wrapper} index={this.state.pageIndex} loop={false} onMomentumScrollEnd ={this._onMomentumScrollEnd.bind(this)} 
                showsPagination={this.state.showsPagination}>
                
                <View style={styles.slide}>
                    <Image style={styles.img} 
                        source={require('./img/tutorial_1.jpg')}/>
                    <View style={styles.textBox} >
                        <View style={styles.textTopBox} >
                            <Text style={[Font.DEFAULT_FONT_ORANGE_BOLD, {fontSize: 15 * Const.DEVICE_RATIO}]}>산지직송 지리산 농작물과</Text>
                            <Text style={[Font.DEFAULT_FONT_ORANGE_BOLD, {fontSize: 15 * Const.DEVICE_RATIO}]}>제철 식재료를 사용합니다.</Text>
                            <View style={[styles.line, styles.marginTopBottom]} />
                            <Text style={Font.DEFAULT_FONT_BLACK}>더 이상 우리 몸에 미안해하지 마세요.</Text>
                            <Text style={Font.DEFAULT_FONT_BLACK}>매일 새벽 가장 신선한 식재료를 직접 공수합니다.</Text>
                            <Text style={Font.DEFAULT_FONT_BLACK}>식재료만큼은 절대 타협하지 않고 좋은 요리만을 만들것을</Text>
                            <Text style={Font.DEFAULT_FONT_BLACK}>플레이팅이 약속합니다.</Text>
                        </View>
                            <View style={styles.buttonBoxWhite}>
                        </View>
                    </View>
                </View>
                <View style={styles.slide}>
                    <Image style={styles.img} 
                        source={require('./img/tutorial_2.jpg')}/>
                    <View style={styles.textBox} >
                        <View style={styles.textTopBox} >
                            <Text style={[Font.DEFAULT_FONT_ORANGE_BOLD, {fontSize: 15 * Const.DEVICE_RATIO}]}>냉동 육류, 어류를</Text>
                            <Text style={[Font.DEFAULT_FONT_ORANGE_BOLD, {fontSize: 15 * Const.DEVICE_RATIO}]}>사용하지 않습니다.</Text>
                            <View style={[styles.line, styles.marginTopBottom]} />
                            <Text style={Font.DEFAULT_FONT_BLACK}>모든 육류, 어류는 냉동되지 않은 상태로</Text>
                            <Text style={Font.DEFAULT_FONT_BLACK}>셰프들이 직접 손질합니다.</Text>
                            <Text style={Font.DEFAULT_FONT_BLACK}>특히 생물 연어를 키친에서 직접 잡아</Text>
                            <Text style={Font.DEFAULT_FONT_BLACK}>비교 불가한 신선함과 맛을 고집합니다.</Text>
                        </View>
                        <View style={styles.buttonBoxWhite}>
                        </View>
                    </View>
                </View>
                <View style={styles.slide}>
                    <Image style={styles.img} 
                        source={require('../commonComponent/img/login_main.jpg')}/>
                    <View style={styles.textBox} >
                        <View style={styles.textTopBox} >
                            <Text style={[Font.DEFAULT_FONT_ORANGE_BOLD, {fontSize: 15 * Const.DEVICE_RATIO}]}>국내 실력파 셰프들이 직접 조리하여</Text>
                            <Text style={[Font.DEFAULT_FONT_ORANGE_BOLD, {fontSize: 15 * Const.DEVICE_RATIO}]}>정성을 담아 배달합니다.</Text>
                            <View style={[styles.line, styles.marginTopBottom]} />
                            <Text style={Font.DEFAULT_FONT_BLACK}>셰프들이 직접 개발한 새로운 메뉴들을 매일 선보입니다.</Text>
                            <Text style={Font.DEFAULT_FONT_BLACK}>신선하게 냉장보관된 상태로 배달되어 전자렌지만 있으면</Text>
                            <Text style={Font.DEFAULT_FONT_BLACK}>언제 어디서나 특별한 요리를 즐길 수 있습니다.</Text>
                        </View>
                        <TouchableHighlight onPress={Actions.SignInPage} underlayColor={'transparent'}>
                            <View style={styles.buttonBoxOrange}>
                                <Text style={Font.DEFAULT_FONT_WHITE_BOLD}>플레이팅 시작하기 ></Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>

            </Swiper>
        );
    }
}

let styles = StyleSheet.create({
    wrappr: {
        backgroundColor: 'green',
        flex: 1,
    },
    slide: {
        width: Const.WIDTH,
        height: Const.HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    img: {
        width: Const.WIDTH,
        height: Const.HEIGHT * 0.6,
        resizeMode: 'contain',
    },
    textBox: {
        width: Const.WIDTH,
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTopBox: {
        width: Const.WIDTH,
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        borderWidth: 0.8,
        borderColor: Color.PRIMARY_ORANGE,
        backgroundColor: Color.PRIMARY_ORANGE,
        width: 50,
    },
    marginTopBottom: {
        marginTop: 20 * Const.DEVICE_RATIO,
        marginBottom: 20 * Const.DEVICE_RATIO,
    },
    buttonBoxOrange: {
        height: 50,
        width: Const.WIDTH,
        backgroundColor: Color.PRIMARY_ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBoxWhite: {
        height: 50,
        width: Const.WIDTH,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
