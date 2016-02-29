'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import Separator from '../commonComponent/Separator';
import CartMenuList from './components/CartMenuList';
import Color from '../const/Color';
import Const from '../const/Const';
import PaymentInfoRow from './components/PaymentInfoRow';
import AddressInfoRow from './components/AddressInfoRow';


let radio_include_cutlery = [
    { label: '예', value: 'Y' },
    { label: '아니오', value: 'N' }
];
let radio_pay_method = [
    { label: '카드', value: 'CARD' },
    { label: '현장카드', value: 'PHYSICAL_CARD' },
    { label: '현금', value: 'CASH' }
];

export default class DailyMenuPage extends React.Component {


    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.pageCommentBox}>
                    <Text style={styles.pageCommentText}>모든 메인메뉴는 전자렌지 조리용입니다.</Text>
                </View>
                <View style={styles.content}>
                    <CartMenuList menus={this.props.cart.menus}/>
                    <Separator />
                    <PaymentInfoRow headerText={'합계'} price={this.props.cart.menuTotalPrice} userInput='N'/>
                    <PaymentInfoRow headerText={'배달비'} price={this.props.cart.deliveryFee} userInput='N'/>
                    <PaymentInfoRow headerText={'포인트 할인'} price={this.props.cart.pointUsed} userInput='N'/>
                    <PaymentInfoRow headerText={'쿠폰 할인'} price={this.props.cart.DiscountCouponPrice} userInput='Y'/>
                    <PaymentInfoRow headerText={'총 결제액'} price={this.props.cart.totalPrice} headerStyle={{fontWeight: 'bold'}} priceStyle={{color: Color.PRIMARY_ORANGE}} userInput='N'/>
                    <Separator />
                    <AddressInfoRow headerText={'배달 주소'} data={this.props.cart.address + ' ' + this.props.cart.addressDetail} type='input'/>
                    <AddressInfoRow headerText={'연락처'} data={this.props.cart.mobile} type='input'/>
                    <AddressInfoRow headerText={'배달 시간'} data={this.props.cart.timeSlot} type='picker'/>
                    
                    <View style={styles.orderbtn}>
                        <Text style={styles.orderbtnText}>{this.props.cart.buttonText}</Text>
                    </View>
                </View>
            </View>
            </ScrollView>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
        marginTop: Const.CONTAINER_MARGIN_TOP,
    },
    pageCommentBox: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
    },
    pageCommentText: {
        color: Color.PRIMARY_ORANGE,
    },
    content: {
        margin: 10,
    },
    priceSummaryBox: {
        marginTop: 10
    },
    priceSummaryRow: {
        flexDirection: 'row',
        marginTop: 5
    },
    priceSummaryHeader: {
        flex: 1,
    },
    priceSummaryHeaderBold: {
        flex: 1,
        fontWeight: 'bold',
    },
    priceSummaryContent: {
        flex: 4,
        textAlign: 'right',
    },
    priceSummaryContentOrange: {
        flex: 4,
        textAlign: 'right',
        color: Color.PRIMARY_ORANGE,
    },
    orderbtn: {
        height: 30,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderColor: Color.PRIMARY_ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    orderbtnText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    }
});
