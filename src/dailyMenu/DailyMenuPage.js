'use strict';
import React, {
    Component,
} from 'react';
import { View, ListView, Text, StyleSheet, TouchableHighlight, Image, ScrollView, Modal, Animated, AsyncStorage, Alert, Linking, Platform, InteractionManager } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Crashlytics } from 'react-native-fabric';
import DeviceInfo from 'react-native-device-info';
import Communications from 'react-native-communications';
import DailyMenuList from './components/DailyMenuList';
import AddressBar from './components/AddressBar';
import Banner from './components/Banner';
import PageComment from '../commonComponent/PageComment';
import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';
import RequestURL from '../const/RequestURL';
import MediaURL from '../const/MediaURL';
import Mixpanel from '../util/mixpanel';
import userInfo from '../util/userInfo';

import { addItemToCart } from '../app/actions/CartActions';
import {
  fetchMyAddress,
} from '../app/actions/AddressActions';

const HEIGHT = Const.HEIGHT;
const WIDTH = Const.WIDTH;
const DATE = new Date();


export default class DailyMenuPage extends Component {

    constructor(props) {
        super(props);
        props.dispatch(fetchMyAddress());
        this.state = {
            menus: [],
            offset: new Animated.Value(-HEIGHT),
            isDialogVisible: false,
            dialogImageURL: '',
            redirect: 0,
        }
        if(userInfo.isLogin) 
            Mixpanel.track('Log In Success');
        // Timing Events
        // Sets the start time for an action, for example uploading an image
        Mixpanel.timeEvent('(Screen) Daily Menu List');
    }
    
    componentDidMount() {
        //this.fetchDailyMenu();
        Actions.refresh();
        this.fetchReviewAvailable();
        this.fetchDialog();
        this.fetchCheckUpdate();
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0,
        }).start();
    }

    componentWillReceiveProps(nextProps) {        
        if( nextProps.myAddress !== undefined && this.props.myAddress !== nextProps.myAddress ) {
            const myAddress = nextProps.myAddress;
            this.fetchDailyMenu(myAddress);
        }
    }

    fetchDailyMenu(myAddress) {
        const area = myAddress.area;
        fetch(`${RequestURL.REQUEST_DAILY_MENU}?area=${area}`)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    menus: responseData
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    fetchReviewAvailable() {
        fetch(RequestURL.REQUEST_REVIEW_AVAILABLE + 'user_idx=' + userInfo.idx)
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.available == 'true') {
                    Actions.WriteReviewPage({ orderIdx: responseData.order_idx, autoPopUp: true, })
                }
            }).catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    fetchDialog() {
        fetch(RequestURL.REQUEST_DIALOG)
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.usedCoupon) {
                    AsyncStorage.getItem('DATE').then((value) => {
                        const formattedDate = this.YYYYMMDD(DATE);
                        if(value === formattedDate) {
                            this.setState({
                                isDialogVisible: false,
                            });
                        } else {
                            this.setState({
                                isDialogVisible: true,
                            });
                        }
                    })
                    this.setState({
                        dialogImageURL: responseData.image_url_dialog,
                        redirect: responseData.redirect,
                    });
                }
            }).catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    fetchCheckUpdate() {
        const buildNumber = DeviceInfo.getBuildNumber();
        const param = 'build=' + buildNumber;
        const url = Platform.OS === 'android' ? 
            RequestURL.REQUEST_APP_UPDATE_AVAILABLE_ANDROID + param
            :
            RequestURL.REQUEST_APP_UPDATE_AVAILABLE_IOS + param;
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                let available = responseData.available;
                if(available) {
                    Alert.alert(
                        '업데이트 필요',
                        '필수 업데이트 버전이 앱스토어에 등록되었습니다.',
                        [
                            { text: '업데이트 하러 가기', onPress: () => this.linkingAppStore() }
                        ]
                    );
                }
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    linkingAppStore() {
        // itms-apps://itunes.apple.com/app/id1031812751
        const url = 'itms-apps://itunes.apple.com/app/id1031812751';
        Communications.web(url);
        this.fetchCheckUpdate();
    }
    closeModalWhileToday() {
        AsyncStorage.setItem('DATE', this.YYYYMMDD(DATE));
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -HEIGHT,
        }).start();
        Mixpanel.track('Close Not to Show Today');
    }
    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -HEIGHT,
        }).start();
        Mixpanel.track('Close Dialog');
    }
    pad2(n) {
        return ((n < 10) ? '0' : '') + n;
    }
    YYYYMMDD(date) {
        return date.getFullYear() + 
            this.pad2(date.getMonth() + 1) +
            this.pad2(date.getDate());
    }
    render() {
        const { dispatch, cart, myAddress } = this.props;
        const isDialogVisible = this.state.isDialogVisible;
        let dialogView = false;
        if(isDialogVisible) {
            const dialogImageURL = this.state.dialogImageURL;
            const uri = MediaURL.DIALOG_URL + dialogImageURL;
            dialogView = <Animated.View style={[styles.containerDialog, 
                                {backgroundColor:'rgba(52,52,52,0.5)'}, 
                                {transform: [{translateY: this.state.offset}]}]}
                        >
                            <View style={styles.dialog}>
                                <Image style={styles.dialogImage}
                                    source={{ uri: uri }}/>
                                <View style={styles.closeBox}>
                                    <TouchableHighlight style={styles.leftCloseBox}
                                        underlayColor={'transparent'}
                                        onPress={ () => this.closeModalWhileToday() }>
                                        <Text style={Font.DEFAULT_FONT_WHITE_UNDERLINE}>오늘 그만 보기</Text>                                        
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.rightCloseBox} 
                                        underlayColor={Color.PRIMARY_GRAY}
                                        onPress={ () => this.closeModal() }>
                                        <Text style={Font.DEFAULT_FONT_WHITE}>닫기</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Animated.View>;
        }

        return (
            <View style={styles.container}>
                <PageComment text='메인 메뉴는 당일 조리, 당일 배송 됩니다' />
                <View style={styles.content}>
                    <ScrollView>
                    <Banner style={styles.banner}/>
                    <DailyMenuList styles={styles.menuList}
                        menus={this.state.menus}
                        addItemToCart={ (menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable) => dispatch(addItemToCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable)) }
                        cart={cart}
                    />
                    </ScrollView>
                    <AddressBar myAddress={myAddress} />
                </View>
                {dialogView}
            </View>
            
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
    },
    menuList: {
        flex: 1,
    },
    containerDialog: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        width: normalize(300),
        height: normalize(300),
        justifyContent: 'center',
        backgroundColor: Color.PRIMARY_DIALOG_BACKGROUND
    },
    dialogImage: {
        width: normalize(300),
        height: normalize(260),
        resizeMode: 'stretch',
    },
    closeBox: {
        height: normalize(40),
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftCloseBox: {
        flex: 1,
        paddingLeft: 10,
    },
    rightCloseBox: {
        height: normalize(30),
        width: normalize(50),
        marginRight: 10,
        backgroundColor: Color.PRIMARY_GRAY,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: normalize(5),
        borderColor: Color.PRIMARY_GRAY,
        overflow: 'hidden',
    },
});
