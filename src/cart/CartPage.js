'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, ScrollView, Image, TextInput, Picker} from 'react-native';
import { Actions } from 'react-native-router-flux';

import PageComment from '../commonComponent/PageComment';
import CartMenuList from './components/CartMenuList';
import PaymentInfoRow from './components/PaymentInfoRow';
import AddressInfoRow from './components/AddressInfoRow';
import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import { addItemToCart } from '../app/actions/CartActions';

import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;


export default class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryFee: 0,
            myInfo: [],
            cardNo: '',
            timeSlot: [],
        }

    }

    componentDidMount() {
        this.fetchCartInfo();
    }

    fetchCartInfo() {
        fetch(RequestURL.REQUEST_CART_INFO + "user_idx=" + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    deliveryFee: responseData.delivery_fee,
                    myInfo: responseData.my_info,
                    cardNo: responseData.card_no,
                    timeSlot: responseData.time_slot,
                });
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();
    }
    
    commaPrice(price) {
        price = String(price);
        return price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,') + '원';
    }

    render() {
        const { dispatch, cart } = this.props;
        console.log(cart);
        //cart.forEach(cart => {
        //    console.log(cart.price);
        //});
        const myInfo = this.state.myInfo;
        const deliveryFee = this.state.deliveryFee;
        const cardNo = this.state.cardNo;
        const timeSlot = this.state.timeSlot;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <PageComment text={"모든 메인메뉴는 전자렌지 조리용입니다."} />
                    <View style={styles.content}>

                        <CartMenuList cart={cart}
                            addItemToCart={ (menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng) => 
                            dispatch(addItemToCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng)) } 
                        />
                        
                        
                        <View style={[styles.row, styles.rowMarginTop10]}>
                            <Text style={styles.textBlack}>합계</Text>
                            <Text style={[styles.data, styles.textBlack]}>{this.commaPrice(cart.menuTotalPrice)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                        
                        <View style={[styles.row, styles.rowMarginTop1]}>
                            <Text style={styles.textBlack}>배달비</Text>
                            <Text style={[styles.data, styles.textBlack]}>{this.commaPrice(deliveryFee)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                        
                        <View style={styles.row}>
                            <Text style={styles.textBlack}>포인트 할인</Text>
                            <Text style={[styles.data, styles.textBlack]}>-{this.commaPrice(myInfo.point)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                         
                        <TouchableHighlight underlayColor={'transparent'}>
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>쿠폰 할인</Text>
                                <Text style={[styles.data, styles.textBlack]}>-{this.commaPrice(cart.DiscountCouponPrice)}</Text>
                                <Image style={styles.iconDetailImage}
                                    source={require('../commonComponent/img/icon_input.png')}/>
                            </View>
                        </TouchableHighlight>

                        
                        <View style={[styles.row, styles.rowMarginTop1]}>
                            <Text style={styles.textBlack, styles.textBold}>총 결제액</Text>
                            <Text style={[styles.data, styles.textOrange, styles.textBold]}>{this.commaPrice(cart.totalPrice)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                        
                        <TouchableHighlight underlayColor={'transparent'} onPress={() => Actions.MyAddressPage()} >
                            <View style={[styles.row, styles.rowMarginTop10]}>
                                <Text style={styles.textBlack}>배달 주소</Text>
                                <Text style={[styles.data, styles.textBlack]}>{myInfo.address + ' ' + myInfo.address_detail}</Text>
                                <Image style={styles.iconDetailImage}
                                    source={require('../commonComponent/img/icon_input.png')}/>
                            </View>
                        </TouchableHighlight> 

                        
                        <TouchableHighlight underlayColor={'transparent'} >
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>연락처</Text>
                                <Text style={[styles.data, styles.textBlack]}>{myInfo.mobile}</Text>
                                <Image style={styles.iconDetailImage}
                                    source={require('../commonComponent/img/icon_input.png')}/>
                            </View>
                        </TouchableHighlight>

                        
                        <TouchableHighlight underlayColor={'transparent'} >
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>배달 시간</Text>
                                <Text style={[styles.data, styles.textOrange]}>{cart.deliveryTime}</Text>
                                    <View>
                                        <Image style={styles.iconDetailImage}
                                            source={require('../commonComponent/img/icon_input.png')}/>
                                    </View>
                            </View>
                        </TouchableHighlight>
                   

                        
                        <View style={styles.row}>
                            <Text style={styles.textBlack}>포크 / 나이프를 넣어주세요</Text>
                            <Text></Text>
                        </View>
                        

                        <View style={styles.row}>
                            <Text style={styles.textBlack}>결제수단</Text>
                            <Text></Text>
                        </View>
                        

                        <View style={styles.row}>
                            <Text style={styles.textBlack}>카드</Text>
                            <Text></Text>
                        </View>

                        
                        <View style={styles.orderbtn}>
                            <Text style={styles.orderbtnText}>주문하기</Text>
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
        flex: 1,
        flexDirection: 'column',
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
