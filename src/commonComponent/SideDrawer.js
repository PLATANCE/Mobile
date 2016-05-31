import React, {
    Component,
    PropTypes,
} from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, AlertIOS, Alert, PixelRatio } from 'react-native';
import { DefaultRenderer } from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
import Color from '../const/Color';
import Const from '../const/Const';
import { Font, normalize } from '../const/Font';

import {
  fetchMyPoint,
  fetchMyCoupon,
} from '../app/actions/SideInfoActions';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import RequestURL from '../const/RequestURL';
import userInfo from '../util/userInfo';
import Mixpanel from '../util/mixpanel';



class SideDrawerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            point: 0,
            cntCoupon: 0,
        };
    }
    componentDidMount() {
        this.fetchUserPoint();
        this.fetchMyCoupon();
    }
    fetchUserPoint() {
        const userIdx = userInfo.idx;
        fetch(RequestURL.REQUEST_USER_POINT + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData) {
                    this.setState({
                        point: responseData.point,
                    });
                }
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    fetchMyCoupon() {
        const userIdx = userInfo.idx;
        fetch(RequestURL.REQUEST_MY_COUPON_LIST + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    cntCoupon: responseData.length,
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    commaPrice(price) {
        price = String(price);
        return price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }
    openPromptDialog() {
        AlertIOS.prompt(
            '코드 등록',
            '등록하신 코드는 포인트 혹은 쿠폰으로 전환되어 결제할 때 사용됩니다.',
            [
                { text: '취소', onPress: () => Mixpanel.trackWithProperties('Enter Promo Code', { entered: false }) },
                { text: '등록', onPress: (code) => this.submitCode(code) },
            ]
        );
    }
    submitCode(code) {
        Mixpanel.trackWithProperties('Enter Promo Code', { entered: true, code: code });
        let param = 'user_idx=' + userInfo.idx + '&code=' + code;

        fetch(RequestURL.SUBMIT_POINT_REGISTER + param)
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.isValidCode) {
                    Alert.alert(
                        responseData.title,
                        responseData.message,
                        [
                            { text: '확인', onPress: () => this.fetchUserPoint() }
                        ]
                    );
                } else {
                    Alert.alert(
                        responseData.title,
                        responseData.message,
                        [
                            { text: '확인' }
                        ]
                    );
                }
            })
            .catch((error) => {
                console.warn(error);
            })
        }
    render() {
        const { drawer } = this.context;
        let cntCoupon = this.state.cntCoupon;
        let cntCouponText = (cntCoupon > 0) ? '(' + cntCoupon + ')' : '';

        const rowInfo = [
            { text: "내 쿠폰함 ", cnt: cntCouponText, image: require('./img/icon_left_coupon.png'), action: () => { Actions.MyCouponPage({ disable: false }), Mixpanel.track('View My Coupons') } },
            { text: "주문 내역", image: require('./img/icon_left_order.png'), action: () => { Actions.MyOrderPage(), Mixpanel.track('View Order History') } },
            { text: "고객 센터", image: require('./img/icon_left_headset.png'), action: Actions.CSMainPage },
        ];

        var drawerRow = [];
        rowInfo.forEach(row => {
            const text = row.text;
            const image = row.image;
            const action = row.action;
            const cnt = row.cnt;

            drawerRow.push(<TouchableHighlight key={text} onPress={action} underlayColor={'transparent'}>
                                <View style={styles.drawerRow}>
                                    <Image style={styles.drawerImage}
                                        source={image}/>
                                    <Text style={[Font.DEFAULT_FONT_BLACK, { marginLeft: 10 }]}>{text}
                                        <Text style={Font.DEFAULT_FONT_ORANGE}>{cnt}</Text>
                                    </Text>
                                </View>
                            </TouchableHighlight>);
        });
        return (
            <View style={styles.container}>
                <View style={styles.headerBox}>
                    <Image style={styles.imageLogo}
                        source={require('./img/plating_logo.png')}/>
                    <Text style={[styles.pointText, Font.DEFAULT_FONT_WHITE]}>내 포인트:
                        <Text style={{fontSize: normalize(20)}}> {this.commaPrice(this.state.point)}p</Text></Text>
                    <TouchableHighlight
                        onPress={ () => this.openPromptDialog() }
                        underlayColor={'transparent'}
                    >
                        <View style={styles.actionPoint}>
                            <Text style={[{margin: normalize(10)}, Font.DEFAULT_FONT_WHITE ]}>+ 포인트·쿠폰코드 등록</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.drawerRowBox} >
                   {drawerRow}
                </View>
                <TouchableHighlight
                    onPress={ () => { Actions.ReferPage(), Mixpanel.track } }
                    underlayColor={'transparent'}
                    >
                    <View style={styles.footerBox}>
                        <Image style={styles.footerImage}
                            source={require('./img/invite_friend.png')} />
                        <View style={styles.footerTextBox}>
                            <Text style={[Font.DEFAULT_FONT_WHITE, { textDecorationLine: 'underline', fontSize: normalize(20) }]}>친구 초대하기</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

export default class SideDrawer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const children = this.props.navigationState.children;
        return (
            <Drawer
                ref="drawer"
                type="displace"
                content={<SideDrawerContent />}
                tapToClose={true}
                openDrawerOffset={0.3}
                panCloseMask={0.2}
                negotiatePan={true}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({ main: { opacity: Math.max(0.54, 1-ratio) } })} >

                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />

            </Drawer>
        )
    }
}

var drawerStyles = {
    drawer: {
        backgroundColor: '#ffffff',
    },
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalPoint: {
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(250),
        height: normalize(250),
        backgroundColor: 'white',
    },
    headerBox: {
        height: normalize(180),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.PRIMARY_ORANGE,
    },
    imageLogo: {
        height: normalize(20),
        width: normalize(170),
        marginTop: normalize(32),
        resizeMode: 'contain',
    },
    pointText: {
        marginTop: normalize(30),
    },
    actionPoint: {
        height: normalize(40),
        width: normalize(170),
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: normalize(5),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(10),
        marginBottom: normalize(10),
        marginLeft: normalize(16),
        marginRight: normalize(16),
    },
    drawerRowBox: {
        flex: 1,
        marginLeft: normalize(20),
    },
    drawerRow: {
        height: normalize(60),
        borderBottomWidth: 0.2,
        borderColor: Color.PRIMARY_GRAY,
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: normalize(10),
    },
    drawerImage: {
        width: normalize(20),
        height: normalize(20),
    },
    footerBox: {
        height: normalize(100),
        backgroundColor: Color.PRIMARY_ORANGE,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: normalize(20),
    },
    footerImage: {
        width: normalize(50),
        height: normalize(50),
    },
    footerTextBox: {
        justifyContent: 'center',
        marginLeft: normalize(10),
    },

});
