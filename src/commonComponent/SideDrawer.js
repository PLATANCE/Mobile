import React, { Text, View, Component, PropTypes, StyleSheet, Image, TouchableHighlight, AlertIOS, Alert, PixelRatio } from 'react-native';
import Drawer from 'react-native-drawer';
import Color from '../const/Color';
import Const from '../const/Const';
import Font from '../const/Font';
import Separator from './Separator';

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
            referPriceText: '',
            cntCoupon: 0,
        };
    }
    componentDidMount() {
        this.fetchUserPoint();
        this.fetchPolicyRefer();
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
    fetchPolicyRefer() {
        fetch(RequestURL.REQUEST_GET_POLICY_REFER_POINT)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    referPriceText: responseData.korReferPoint,
                });
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
            '등록하신 코드는 포인트로 전환되어 결제할 때 사용됩니다.',
            [
                { text: '취소', onPress: () => Mixpanel.trackWithProperties('Enter Promo Code', { entered: false }) },
                { text: '등록', onPress: (code) => this.submitCode(code) },
            ],
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
        let referPriceText = this.state.referPriceText + ' + ' + this.state.referPriceText + ' 포인트 지급';

        const rowInfo = [
            { text: "주문 내역", image: require('./img/icon_left_order.png'), action: () => { Actions.MyOrderPage(), Mixpanel.track('View Order History') } },
            { text: "내 쿠폰함 " + cntCouponText, image: require('./img/icon_left_coupon.png'), action: () => { Actions.MyCouponPage({ disable: false }), Mixpanel.track('View My Coupons') } },
            { text: "포인트·코드 등록", image: require('./img/icon_left_won.png'), action: () => this.openPromptDialog()},
            { text: "고객 센터", image: require('./img/icon_left_headset.png'), action: Actions.CSMainPage },
            { text: "Plating 이란?", image: require('./img/icon_left_meal.png'), action: () => { Actions.PlatingPage(), Mixpanel.track('View Plating Intro') } },
        ];
        
        var drawerRow = [];
        rowInfo.forEach(row => {
            let text = row.text;
            let image = row.image;
            let action = row.action;

            drawerRow.push(<TouchableHighlight key={text} onPress={action} underlayColor={'transparent'}>
                                <View style={styles.drawerRow}>
                                    <Image style={styles.drawerImage}
                                        source={image}/>
                                    <Text style={[Font.DEFAULT_FONT_BLACK, { marginLeft: 10 }]}>{text}</Text>
                                </View>
                            </TouchableHighlight>);
        });
        return (
            <View style={styles.container}>
                <View style={styles.headerBox}>
                    <Image style={styles.imageLogo}
                        source={require('./img/plating_logo.png')}/>
                    <Text style={[styles.pointText, Font.DEFAULT_FONT_WHITE]}>내 포인트: {this.commaPrice(this.state.point)}p</Text>
                </View>
                <View style={styles.drawerRowBox} >
                   {drawerRow}
                </View>
                <TouchableHighlight 
                    onPress={ () => { Actions.ReferPage(), Mixpanel.track } } 
                    underlayColor={'transparent'}
                    >
                    <View style={styles.footerBox}>
                        <Text style={[Font.DEFAULT_FONT_WHITE_BOLD, { fontSize: 18 }]}>친구 초대</Text>
                        <Text style={Font.DEFAULT_FONT_WHITE_BOLD}>{referPriceText}</Text>
                        <Text style={[Font.DEFAULT_FONT_WHITE, { textDecorationLine: 'underline' }]}>초대하러 가기</Text>
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
        return (
            <Drawer
                ref="drawer"
                type="overlay"
                content={<SideDrawerContent />}
                tapToClose={true}
                openDrawerOffset={0.3} 
                panCloseMask={0.2}
                closedDrawerOffset={0}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })} >

                {React.Children.map(this.props.children, c => React.cloneElement(c, {
                    route: this.props.route
                }))}

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
        width: 250,
        height: 250,
        backgroundColor: 'white',
    },
    headerBox: {
        height: 150 * Const.DEVICE_RATIO,
        justifyContent: 'center',
        backgroundColor: Color.PRIMARY_ORANGE,
        paddingLeft: 20,
    },
    imageLogo: {
        height: 20 * Const.DEVICE_RATIO,
        width: 170 * Const.DEVICE_RATIO,
        marginTop: 32,
        resizeMode: 'contain',
    },
    pointText: {
        marginTop: 10,
    },
    drawerRowBox: {
        flex: 1,
        marginLeft: 20,
    },
    drawerRow: {
        height: 60 * Const.DEVICE_RATIO,
        borderBottomWidth: 0.2,
        borderColor: Color.PRIMARY_GRAY,
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 10,
    },
    drawerImage: {
        width: 20 * Const.DEVICE_RATIO,
        height: 20 * Const.DEVICE_RATIO,
    },
    footerBox: {
        height: 100 * Const.DEVICE_RATIO,
        backgroundColor: Color.PRIMARY_ORANGE,
        justifyContent: 'center',
        paddingLeft: 20,
    },
});
