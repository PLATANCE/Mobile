'use strict';
import React, 
{ View, 
    Text, 
    StyleSheet, 
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView, 
    Image, 
    TextInput,
    Alert, 
    PickerIOS,
    AlertIOS,  } from 'react-native';
const PickerItemIOS = PickerIOS.Item;
import Picker from 'react-native-picker';

import { Actions } from 'react-native-router-flux';

import PageComment from '../commonComponent/PageComment';
import CartMenuList from './components/CartMenuList';
import PaymentInfoRow from './components/PaymentInfoRow';
import AddressInfoRow from './components/AddressInfoRow';
import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import { addItemToCart, decreaseItemFromCart } from '../app/actions/CartActions';

import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;

const PICKER_PAY_METHOD_DATA = [
    "카드", "현장카드", "현금"
];
const PICKER_CUTLERY_DATA = [
    "예", "아니요"
];
export default class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryFee: 0,
            myInfo: [],
            cardNo: Const.CART_CARD_INPUT_MESSAGE,
            timeSlot: [],
            timeSlotPickerData: [],
            selectedTimeSlot: '',
            selectedTimeSlotParam: 14,
            selectedCutlery: '예',
            selectedCutleryParam: 0,
            selectedPayMethod: '카드',
            selectedPayMethodParam: 1,
            totalPrice: 0,
        }
    }

    componentDidMount() {
        this.fetchCartInfo();
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.cart, this.props.cart);
        // if cart length < 1, move to dailyMenu
        console.log(Object.keys(nextProps.cart).length);
        if(Object.keys(nextProps.cart).length == 0) {
            Actions.pop();
        }
    }

    fetchCartInfo() {
        fetch(RequestURL.REQUEST_CART_INFO + "user_idx=" + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                let timeSlot = responseData.time_slot;
                let timeSlotPickerData = [];

                this.setState({
                    deliveryFee: responseData.delivery_fee,
                    myInfo: responseData.my_info,
                    cardNo: responseData.card_no,
                    timeSlot: responseData.time_slot,
                });
                if(timeSlot.length > 0) {
                    timeSlot.map((timeSlot) => {
                        timeSlotPickerData.push(timeSlot.time_slot);
                    });
                    this.setState({
                        timeSlotPickerData: timeSlotPickerData,
                        selectedTimeSlot: timeSlotPickerData[0],
                    });
                } else {
                    this.setState({
                        timeSlotPickerData: timeSlotPickerData,
                        selectedTimeSlot: Const.CART_DELIVERY_TIME_CLOSED_MESSAGE,
                    });
                }
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

    openAlertMoble() {
        //console.log("openAlertMoble");
        AlertIOS.prompt(
            '전화 번호',
            '배달 시, 연락 받으실 전화번호를 입력해주세요.(-제외)\n 예) 010-1234-5678',
            [
                { text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: '확인', onPress: (mobile) => this.submitUserMobile(mobile) }
            ],
        )
    }

    openPickerDeliveryTime() {
        this.timeSlotPicker.toggle();
    }
    openPickerPayMethod() {
        this.payMethodPicker.toggle();
    }
    openPickerCutlery() {
        this.cutleryPicker.toggle();
    }

    setDeliveryTime(selectedTimeSlot) {
        console.log(selectedTimeSlot);
        // find timeslot index
        let timeSlot = this.state.timeSlot;
        let selectedTimeSlotParam = this.state.selectedTimeSlotParam;
        timeSlot.map((timeSlot) => {
            if(selectedTimeSlot == Const.CART_DELIVERY_TIME_INPUT_MESSAGE) {
                this.setState({
                    selectedTimeSlot: timeSlot.time_slot,
                    selectedTimeSlotParam: null,
                });
            }else if(selectedTimeSlot == timeSlot.time_slot) {
                this.setState({
                    selectedTimeSlot: timeSlot.time_slot,
                    selectedTimeSlotParam: timeSlot.idx,
                });
            }
        })
    }

    setPayMethod(selectedPayMethod) {
        let selectedPayMethodParam = 0;
        if(selectedPayMethod == '카드') {
            selectedPayMethodParam = 1;
        } else if(selectedPayMethod == '현장카드') {
            selectedPayMethodParam = 2;
        } else if(selectedPayMethod == '현금') {
            selectedPayMethodParam = 3;
        }
        this.setState({
            selectedPayMethod: selectedPayMethod,
            selectedPayMethodParam: selectedPayMethodParam,
        });
    }

    setCutlery(selectedCutlery) {
        let selectedCutleryParam = 0;
        if(selectedCutlery == '예') {
            selectedCutleryParam = 1;
        } else {
            selectedCutleryParam = 0;
        }
        this.setState({
            selectedCutlery: selectedCutlery,
            selectedCutleryParam: selectedCutleryParam,
        });
        console.log(this.state.selectedCutlery, this.state.selectedCutleryParam);
    }

    submitUserMobile(mobile) {
        const param = {
            user_idx: userIdx,
            phone_no: mobile,
        };

        fetch(RequestURL.SUBMIT_UPDATE_MOBILE, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);  // {update: 'mobile'}
        })
        .catch((error) => {
            console.warn(error);
        })
        .done();
    }

    openAlertToConfirmOrder(cart, totalPrice, point, couponIdx, enableOrderButton) {
        if(enableOrderButton) {
            let selectedTimeSlot = this.state.selectedTimeSlot;
            let myInfo = this.state.myInfo;
            
            Alert.alert(
                '주문 요약',
                '배달 시간\n' + selectedTimeSlot + '\n\n' + 
                '배달 주소\n' + myInfo.address + myInfo.address_detail + '\n\n' + 
                '최종 결제 금액\n' + this.commaPrice(totalPrice),
                [
                    { text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: '주문', onPress: () => this.submitPlaceOrder(cart, totalPrice, point, couponIdx) }
                ],
            );
        }
        
    }
    submitPlaceOrder(cart, totalPrice, point, couponIdx) {
        // user_idx, time_slot, total_price, menu_d_idx, order_amount, point, pay_method, coupon_idx, include_cutlery
        //console.log(cart, totalPrice, point, couponIdx);
        let menuDIdxParam = '';
        let menuAmountParam = '';
        for(let menuIdx in cart) {
            menuDIdxParam += cart[menuIdx].menuDIdx + '|';
            menuAmountParam += cart[menuIdx].amount + '|';
        }
        menuDIdxParam = menuDIdxParam.substring(0, menuDIdxParam.length - 1);
        menuAmountParam = menuAmountParam.substring(0, menuAmountParam.length - 1);
        const param = {
            user_idx: userIdx,
            time_slot: this.state.selectedTimeSlotParam,
            total_price: totalPrice,
            menu_d_idx: menuDIdxParam,
            order_amount: menuAmountParam,
            point: point,
            pay_method: this.state.selectedPayMethodParam,
            coupon_idx: couponIdx,
            include_cutlery: this.state.selectedCutleryParam,
        };
        //console.log(param)
        
        fetch(RequestURL.SUBMIT_PLACE_ORDER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        })
        .then((response) => response.json())
        .then((responseData) => {
            let status = responseData.status;
            if(status == 'fail_to_pay') {
                let description = responseData.description;
                Alert.alert(
                    '주문 실패',
                    description,
                );
            } else if(status == 'oos') {
                let outOfStockList = responseData.oos_list;
                let outOfStockMessage = '';
                outOfStockList.forEach((outOfStockMenu, index) => {
                    outOfStockMessage += outOfStockMenu.split('.')[0];
                    if(index != outOfStockList.length - 1) {
                        outOfStockMessage += '\n';
                    }
                });
                Alert.alert(
                    '재고 부족',
                    '아래 항목에 대한 재고가 부족합니다.\n\n' + 
                    outOfStockMessage,
                );
            } else if(status == 'done') {
                let orderIdx = responseData.order_idx;
                let description = responseData.description;
                Alert.alert(
                    '주문 성공',
                    description + '\n' + 
                    '주문내역을 확인하세요 :)',
                    [
                        { text: '주문 확인', onPress: () => Actions.OrderDetailPage({ orderIdx: orderIdx }) }
                    ]
                );
            }
        })
        .catch((error) => {
            console.warn(error);
        })
        .done();
    }
    render() {
        const { dispatch, cart } = this.props;
        const deliveryFee = this.state.deliveryFee;
        const timeSlot = this.state.timeSlot;
        let { couponIdx, discountCouponPrice } = this.props;
        let myInfo = this.state.myInfo;
        let cardNo = this.state.cardNo;
        let deliveryAvailable = myInfo.delivery_available;
        
        let selectedPayMethod = this.state.selectedPayMethod;
        let selectedPayMethodParam = this.state.selectedPayMethodParam;
        let selectedTimeSlot = this.state.selectedTimeSlot;
        let point = 0;
        let menuTotalPrice = 0;
        let totalPrice = 0;

        // orage text or black text when properyly input
        let addressHighlight = (myInfo.address == Const.CART_ADDRESS_INPUT_MESSAGE) ? styles.textOrange : styles.textBlack;
        let mobileHighlight = (myInfo.mobile == Const.CART_MOBILE_INPUT_MESSAGE) ? styles.textOrange : styles.textBlack;
        let cardHighlight = (cardNo == Const.CART_CARD_INPUT_MESSAGE) ? styles.textOrange : styles.textBlack;

        // card layout visible
        let cardLayout = false;
        if(selectedPayMethod == '카드') {
            cardLayout = <TouchableHighlight underlayColor={'transparent'} 
                            onPress={ Actions.AddCardPage }>
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>카드</Text>
                                <Text style={[styles.data, cardHighlight]}>{cardNo}</Text>
                                <View>
                                    <Image style={styles.iconDetailImage}
                                        source={require('../commonComponent/img/icon_input.png')}/>
                                </View>
                            </View>
                        </TouchableHighlight>
        }

        // couponIdx, discountCouponPrice
        if(!couponIdx) couponIdx = 0;
        if(!discountCouponPrice) discountCouponPrice = 0;

        // menu total price        
        for(let menuIdx in cart) {
            menuTotalPrice += cart[menuIdx].altPrice * cart[menuIdx].amount;
        }

        // point
        if(discountCouponPrice) {
            if(myInfo.point >= menuTotalPrice + deliveryFee - discountCouponPrice) {
                point = menuTotalPrice + deliveryFee - discountCouponPrice;
            } else {
                point = myInfo.point;
            }
        } else {
            if(myInfo.point >= menuTotalPrice + deliveryFee) {
                point = menuTotalPrice + deliveryFee;
            } else {
                point = myInfo.point;
            }
        }

        // totalPrice
        totalPrice = menuTotalPrice - deliveryFee - point - discountCouponPrice;

        // enable order button with background color
        let enableOrderButton = true;
        let enableOrderButtonText = '주문하기';
        if(myInfo.address == Const.CART_ADDRESS_INPUT_MESSAGE) {
            enableOrderButton = false;
            enableOrderButtonText = Const.CART_ADDRESS_INPUT_MESSAGE;
        } 
        if(myInfo.mobile == Const.CART_MOBILE_INPUT_MESSAGE) {
            enableOrderButton = false;
            enableOrderButtonText = Const.CART_MOBILE_INPUT_MESSAGE;
        }
        if(selectedTimeSlot == Const.CART_DELIVERY_TIME_CLOSED_MESSAGE) {
            enableOrderButton = false;
            enableOrderButtonText = Const.CART_DELIVERY_TIME_CLOSED_MESSAGE;
        }
        if(!deliveryAvailable) {
            enableOrderButton = false;
            enableOrderButtonText = '배달 지역이 아닙니다.';
        }
        if(selectedPayMethodParam == 1) {
            if(cardNo == Const.CART_CARD_INPUT_MESSAGE) {
                enableOrderButton = false;
                enableOrderButtonText = Const.CART_CARD_INPUT_MESSAGE;
            }
        }

        let orderBtnBackgroundStyle = (enableOrderButton) ? styles.orderBtnColorOrange : styles.orderBtnColorBlack;
        
        return (
            <ScrollView>
                <View style={styles.container}>
                    <PageComment text={'모든 메인메뉴는 전자렌지 조리용입니다.'} />
                    <View style={styles.content}>

                        <CartMenuList cart={cart}
                            addItemToCart={ (menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable) => 
                            dispatch(addItemToCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable)) }
                            decreaseItemFromCart={ (menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng) => 
                            dispatch(decreaseItemFromCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng)) }
                        />
                        
                        
                        <View style={[styles.row, styles.rowMarginTop10]}>
                            <Text style={styles.textBlack}>합계</Text>
                            <Text style={[styles.data, styles.textBlack]}>{this.commaPrice(menuTotalPrice)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                        
                        <View style={[styles.row, styles.rowMarginTop1]}>
                            <Text style={styles.textBlack}>배달비</Text>
                            <Text style={[styles.data, styles.textBlack]}>{this.commaPrice(deliveryFee)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                        
                        <View style={styles.row}>
                            <Text style={styles.textBlack}>포인트 할인</Text>
                            <Text style={[styles.data, styles.textBlack]}>-{this.commaPrice(point)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                         
                        <TouchableHighlight underlayColor={'transparent'} 
                            onPress={() => Actions.MyCouponPage({ disable: true })}
                        >
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>쿠폰 할인</Text>
                                <Text style={[styles.data, styles.textBlack]}>-{this.commaPrice((discountCouponPrice) ? discountCouponPrice : 0)}</Text>
                                <Image style={styles.iconDetailImage}
                                    source={require('../commonComponent/img/icon_input.png')}/>
                            </View>
                        </TouchableHighlight>

                        
                        <View style={[styles.row, styles.rowMarginTop1]}>
                            <Text style={styles.textBlack, styles.textBold}>총 결제액</Text>
                            <Text style={[styles.data, styles.textOrange, styles.textBold]}>{this.commaPrice(totalPrice)}</Text>
                            <View style={styles.iconDetailImage} />
                        </View>

                        
                        <TouchableHighlight underlayColor={'transparent'} 
                            onPress={() => Actions.MyAddressPage()}
                        >
                            <View style={[styles.row, styles.rowMarginTop10]}>
                                <Text style={styles.textBlack}>배달 주소</Text>
                                <Text style={[styles.data, addressHighlight]}>{myInfo.address + '\n' + myInfo.address_detail}</Text>
                                <Image style={styles.iconDetailImage}
                                    source={require('../commonComponent/img/icon_input.png')}/>
                            </View>
                        </TouchableHighlight> 

                        
                        <TouchableHighlight underlayColor={'transparent'} 
                            onPress={ () => this.openAlertMoble() }
                        >
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>연락처</Text>
                                <Text style={[styles.data, mobileHighlight]}>{myInfo.mobile}</Text>
                                <Image style={styles.iconDetailImage}
                                    source={require('../commonComponent/img/icon_input.png')}/>
                            </View>
                        </TouchableHighlight>

                        
                        <TouchableHighlight underlayColor={'transparent'} 
                            onPress={ () => this.openPickerDeliveryTime() }>
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>배달 시간</Text>
                                <Text style={[styles.data, styles.textBlack]}>{this.state.selectedTimeSlot}</Text>
                                <View>
                                    <Image style={styles.iconDetailImage}
                                        source={require('../commonComponent/img/icon_input.png')}/>
                                </View>
                            </View>
                        </TouchableHighlight>
                   

                        <TouchableHighlight underlayColor={'transparent'} 
                            onPress={ () => this.openPickerCutlery() }>
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>포크 / 나이프를 넣어주세요</Text>
                                <Text style={[styles.data, styles.textBlack]}>{this.state.selectedCutlery}</Text>
                                <View>
                                    <Image style={styles.iconDetailImage}
                                        source={require('../commonComponent/img/icon_input.png')}/>
                                </View>
                            </View>
                        </TouchableHighlight>
                        
                        <TouchableHighlight underlayColor={'transparent'} 
                            onPress={ () => this.openPickerPayMethod() }>
                            <View style={styles.row}>
                                <Text style={styles.textBlack}>결제수단</Text>
                                <Text style={[styles.data, styles.textBlack]}>{this.state.selectedPayMethod}</Text>
                                <View>
                                    <Image style={styles.iconDetailImage}
                                        source={require('../commonComponent/img/icon_input.png')}/>
                                </View>
                            </View>
                        </TouchableHighlight>
                        
                        {cardLayout}

                        
                        <TouchableHighlight underlayColor={'transparent'}
                            onPress={ () => this.openAlertToConfirmOrder(cart, totalPrice, point, couponIdx, enableOrderButton) }>
                            <View style={[styles.orderbtn, orderBtnBackgroundStyle]}>
                                <Text style={styles.orderbtnText}>{enableOrderButtonText}</Text>
                            </View>
                        </TouchableHighlight>

                        <Picker ref={ picker => this.timeSlotPicker = picker }
                            style={{ height: 320, backgroundColor: Color.PRIMARY_BACKGROUND } }
                            pickerData={[this.state.timeSlotPickerData]}
                            selectedValue={this.state.selectedTimeSlot}
                            onPickerDone={ (pickedValue) => { this.setDeliveryTime(pickedValue) } }/>
                        <Picker ref={ picker => this.payMethodPicker = picker }
                            style={{ height: 320, backgroundColor: Color.PRIMARY_BACKGROUND, top: 100,} }
                            pickerData={ PICKER_PAY_METHOD_DATA }
                            selectedValue={this.state.selectedPayMethod}
                            onPickerDone={ (pickedValue) => { this.setPayMethod(pickedValue) } }/>
                        <Picker ref={ picker => this.cutleryPicker = picker }
                            style={{ height: 320, backgroundColor: Color.PRIMARY_BACKGROUND, top: 100,} }
                            pickerData={ PICKER_CUTLERY_DATA }
                            selectedValue={this.state.selectedCutlery}
                            onPickerDone={ (pickedValue) => { this.setCutlery(pickedValue) } }/>
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
        height: 320,
        backgroundColor: Color.PRIMARY_BACKGROUND,
        top: 100,
    },
    pickerToolbar: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    orderbtn: {
        height: 40,
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
    orderBtnColorOrange: {
        backgroundColor: Color.PRIMARY_ORANGE,
        borderColor: Color.PRIMARY_ORANGE,
    },
    orderBtnColorBlack: {
        backgroundColor: Color.PRIMARY_BLACK,
        borderColor: Color.PRIMARY_BLACK,
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
