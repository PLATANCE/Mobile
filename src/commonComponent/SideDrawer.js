import React, { Text, View, Component, PropTypes, StyleSheet, Image, TouchableHighlight, AlertIOS, Alert } from 'react-native';
import Drawer from 'react-native-drawer';
import Color from '../const/Color';
import Separator from './Separator';

import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import RequestURL from '../const/RequestURL';
import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;

class SideDrawerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }
    openPromptDialog() {
        AlertIOS.prompt(
            '코드 등록',
            '등록하신 코드는 포인트로 전환되어 결제할 때 사용됩니다.',
            [
                {text: '취소', onPress: () => console.log('Cancel Pressed')},
                {text: '등록', onPress: (code) => this.submitCode(code)},
            ],
        );
    }
    submitCode(code) {
        console.log(code);
        let param = 'user_idx=' + userIdx + '&code=' + code;
        
        console.log(param);
        
        fetch(RequestURL.SUBMIT_POINT_REGISTER + param)
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.isValidCode) {
                    Alert.alert(
                        responseData.title,
                        responseData.message,
                        [
                            { text: '확인' }
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
        const rowInfo = [
            { text: "Home (메뉴보기)", action: Actions.DrawerPage },
            { text: "주문 내역", action: Actions.MyOrderPage },
            { text: "내 쿠폰함", action: () => Actions.MyCouponPage({ disable: false }) },
            { text: "포인트·코드 등록", action: ()=>this.openPromptDialog()},
            { text: "고객 센터", action: Actions.CSMainPage },
            { text: "Plating 이란?", action: Actions.PlatingPage },
        ];

        var drawerRow = [];
        rowInfo.forEach(row => {
            drawerRow.push(<TouchableHighlight key={row.text} onPress={row.action} underlayColor={'transparent'}>
                                <View style={styles.drawerRow}>
                                    <Text style={styles.textBlack}>{row.text}</Text>
                                </View>
                            </TouchableHighlight>);
        });
        return (
            <View style={styles.container}>
                <View style={styles.headerBox}>
                    <Image style={styles.imageLogo}
                        source={require('./img/plating_logo.png')}/>
                    <Text style={styles.pointText}>내 포인트: 10,000p</Text>
                </View>
                <View style={styles.drawerRowBox} >
                   {drawerRow}
                </View>
                <TouchableHighlight onPress={Actions.ReferPage} underlayColor={'transparent'}>
                    <View style={styles.footerBox}>
                        <Text style={[styles.textWhite, styles.textBold]}>친구 초대</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

export default class SideDrawer extends Component {
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
        height: 150,
        justifyContent: 'center',
        marginLeft: 10,
        marginTop: 16,
    },
    imageLogo: {
        height: 20,
        width: 170,
        resizeMode: 'contain',
    },
    pointText: {
        marginTop: 10,
        color: Color.PRIMARY_ORANGE
    },
    drawerRowBox: {
        flex: 1,
        marginLeft: 10,
    },
    drawerRow: {
        height: 50,
        borderBottomWidth: 0.2,
        borderColor: Color.PRIMARY_GRAY,
        justifyContent: 'center',
        marginRight: 10,
    },
    drawerImage: {
        width: 20,
        height: 20,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK
    },
    textOrange: {
        color: Color.PRIMARY_ORANGE
    },
    textWhite: {
        color: 'white'
    },
    textBold: {
        fontWeight: 'bold',
    },
    footerBox: {
        height: 100,
        backgroundColor: Color.PRIMARY_ORANGE,
        justifyContent: 'center',
        paddingLeft: 10,
    },
});
