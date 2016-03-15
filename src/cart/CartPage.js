'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image, Modal, TextInput } from 'react-native';
import Picker from 'react-native-picker';

import PageComment from '../commonComponent/PageComment';
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

export default class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    openModal() {
        this.setState({
            modalVisible: true
        });
    }

    closeModal() {
        this.setState({
            modalVisible: false
        });
    }

    _onPickerDone(pickedValue) {
        this.setState({

        });
    }

    commaPrice(price) {
        price = String(price);
        return price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,') + '원';
    }

    toggleTimePicker() {
        this.picker.toggle();
    }

    render() {
        let cart = this.props.cart;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <PageComment text={"모든 메인메뉴는 전자렌지 조리용입니다."} />
                    <View style={styles.content}>
                        <CartMenuList menus={this.props.cart.menus}/>
                        
                        {/*합계*/}
                        <View style={[styles.row, styles.rowMarginTop10]}>
                            <Text style={styles.textBlack}>합계</Text>
                            <Text style={[styles.data, styles.textBlack]}>{this.commaPrice(cart.menuTotalPrice)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                        {/*배달비*/}
                        <View style={[styles.row, styles.rowMarginTop1]}>
                            <Text style={styles.textBlack}>배달비</Text>
                            <Text style={[styles.data, styles.textBlack]}>{this.commaPrice(cart.deliveryFee)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                        {/*포인트 할인*/}
                        <View style={styles.row}>
                            <Text style={styles.textBlack}>포인트 할인</Text>
                            <Text style={[styles.data, styles.textBlack]}>-{this.commaPrice(cart.pointUsed)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                        {/*쿠폰 할인*/}
                        <TouchableHighlight underlayColor={'transparent'}>
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>쿠폰 할인</Text>
                                <Text style={[styles.data, styles.textBlack]}>-{this.commaPrice(cart.DiscountCouponPrice)}</Text>
                                <Image style={styles.iconDetailImage}
                                    source={require('../commonComponent/img/icon_input.png')}/>
                            </View>
                        </TouchableHighlight>

                        {/*총 결제액*/}
                        <View style={[styles.row, styles.rowMarginTop1]}>
                            <Text style={styles.textBlack, styles.textBold}>총 결제액</Text>
                            <Text style={[styles.data, styles.textOrange, styles.textBold]}>{this.commaPrice(cart.totalPrice)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                        {/*배달 주소*/}
                        <TouchableHighlight underlayColor={'transparent'}>
                            <View style={[styles.row, styles.rowMarginTop10]}>
                                <Text style={styles.textBlack}>배달 주소</Text>
                                <Text style={[styles.data, styles.textBlack]}>{cart.address + ' ' + cart.addressDetail}</Text>
                                <Image style={styles.iconDetailImage}
                                    source={require('../commonComponent/img/icon_input.png')}/>
                            </View>
                        </TouchableHighlight> 

                        {/*연락처*/}
                        <TouchableHighlight underlayColor={'transparent'} onPress={()=>this.openModal()}>
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>연락처</Text>
                                <Text style={[styles.data, styles.textBlack]}>{cart.mobile}</Text>
                                <Image style={styles.iconDetailImage}
                                    source={require('../commonComponent/img/icon_input.png')}/>
                            </View>
                        </TouchableHighlight>

                        {/*배달 시간*/}
                        <TouchableHighlight onPress={this.toggleTimePicker.bind(this)} underlayColor={'transparent'}>
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>배달 시간</Text>
                                <Text style={[styles.data, styles.textOrange]}>{cart.deliveryTime}</Text>
                                    <View>
                                        <Image style={styles.iconDetailImage}
                                            source={require('../commonComponent/img/icon_input.png')}/>
                                    </View>
                            </View>
                        </TouchableHighlight>
                   
                        {/*포크 / 나이프를 넣어주세요.*/}
                        <View style={styles.row}>
                            <Text style={styles.textBlack}>포크 / 나이프를 넣어주세요</Text>
                            <Text></Text>
                        </View>
                        {/*결제수단*/}
                        <View style={styles.row}>
                            <Text style={styles.textBlack}>결제수단</Text>
                            <Text></Text>
                        </View>
                        {/*카드*/}
                        <View style={styles.row}>
                            <Text style={styles.textBlack}>카드</Text>
                            <Text></Text>
                        </View>

                        
                        <View style={styles.orderbtn}>
                            <Text style={styles.orderbtnText}>{this.props.cart.buttonText}</Text>
                        </View>
                    </View>
                    <Modal
                        animated={true}
                        transparent={true}
                        visible={this.state.modalVisible}>
                        <View style={[styles.container, styles.modalBackgroundStyle]}>
                            <View style={styles.innerContainer}>
                                <View style={styles.modalContentBox}>
                                    <Text>전화번호</Text>
                                    <Text>연락받을 수 있는 번호를 입력해주세요.</Text>
                                    <TextInput style={styles.textInput} maxLength={11} autoFocus={true}
                                        placeholder='5자리 이상 11자리 이하:)' multiline={true}/>
                                </View>
                                <View style={styles.modalButtonBox}>
                                    <TouchableHighlight style={[styles.modalButton, {borderRightWidth: 0.5}]} onPress={()=>this.closeModal()} underlayColor={'transparent'}>
                                        <Text>취소</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.modalButton} underlayColor={'transparent'} >
                                        <Text>확인</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                {/*}
                <Picker ref={picker => this.picker = picker} style={styles.picker} pickerToolBarStyle={styles.pickerToolbar}
                            showDuration={300} showMask={true} pickerData={this.props.cart.timeSlot}
                            selectedValue={3} onPickerDone={(pickedValue) => {
                                this._onPickerDone(pickedValue);
                            }} />
                {*/}
            </ScrollView>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
        marginTop: Const.MARGIN_TOP,
        justifyContent: 'center',
    },
    content: {
        marginTop: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
    },
    rowMarginTop10: {
        marginTop: 10,
    },
    rowMarginTop1: {
        marginTop: 1,
    },
    textBlack: {
        color: Color.PRIMARY_BLACK,
    },
    textOrange: {
        color: Color.PRIMARY_ORANGE,
    },
    textBold: {
        fontWeight: 'bold',
    },
    data: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 5,
    },
    iconDetailImage: {
        width: 10,
        height: 10,
    },
    picker: {
        backgroundColor: 'white',
    },
    pickerToolbar: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    orderbtn: {
        height: 40,
        backgroundColor: Color.PRIMARY_ORANGE,
        borderColor: Color.PRIMARY_ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    orderbtnText: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    innerContainer: {
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
    },
    modalBackgroundStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    textInput: {
        height: 26,
        borderBottomWidth: 1,
        borderColor: Color.PRIMARY_ORANGE,
        fontSize: 13,
        padding: 4,
        marginLeft: 20,
        marginRight: 20,
    },
    modalContentBox: {
        paddingTop: 20,
        alignItems: 'center',
    },
    modalButtonBox: {
        marginTop: 10,
        flexDirection: 'row',
        height: 40,
        alignSelf: 'stretch',
        flex: 1,
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopWidth: 0.5,
        overflow: 'hidden',
        borderColor: Color.PRIMARY_BLACK,
    },
});
