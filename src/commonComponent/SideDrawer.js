import React, { Alert, Text, View, Component, PropTypes, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Drawer from 'react-native-drawer';
import Color from '../const/Color';
import Separator from './Separator';

import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

class SideDrawerContent extends Component {

    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };
    openPointDialog() {
        
    }
    openContactDialog() {
        Alert.alert(
            '고객 지원',
            null, [
                { text: '카카오톡 채팅하기', onPress: () => console.log('카카오톡 채팅하기 Pressed!') },
                { text: '전화걸기', onPress: () => console.log('전화걸기 Pressed!') },
                { text: '취소', onPress: () => console.log('취소 Pressed!') },
            ]
        )
    }
    openPlatingDescriptionDialog() {
        Alert.alert("Plating 이란?", "플레이팅은 정직하고 특별한 음식을 제공합니다.\n\n국내 실력파 셰프들이 엄선한 식재료와 레시피로 직접 조리한 요리를 합리적인 가격대에 즐기세요.");
    }
    render() {
        const { drawer } = this.context;
        const rowInfo = [
            { text: "Home (메뉴보기)", action: Actions.DrawerPage },
            { text: "주문 내역", action: Actions.MyOrderPage },
            { text: "내 쿠폰함", action: Actions.MyCouponPage },
            { text: "포인트·코드 등록", action: this.openPointDialog },
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
                <Modal style={styles.modalPoint} position={"center"} isOpen={true} isDisabled={true}>
                    <Text>sdf</Text>
                </Modal>
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
                        <Text style={[styles.textBlack, styles.textBold]}>친구 초대</Text>
                        <Text style={styles.textWhite}>1만원 + 1만원 쿠폰 지급</Text>
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
                tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
            >
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
