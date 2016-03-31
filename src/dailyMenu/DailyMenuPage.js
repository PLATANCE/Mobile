'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, ScrollView, Modal, Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DailyMenuList from './components/DailyMenuList';
import AddressBar from './components/AddressBar';
import Banner from './components/Banner';
import PageComment from '../commonComponent/PageComment';
import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';
import MediaURL from '../const/MediaURL';

import { addItemToCart } from '../app/actions/CartActions';
import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;
const HEIGHT = Const.HEIGHT;
const WIDTH = Const.WIDTH;


export default class DailyMenuPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            address: '먼저, 배달 가능 지역을 확인해주세요 :)',
            addressDetail: '',
            offset: new Animated.Value(-HEIGHT),
            isDialogVisible: false,
            dialogImageURL: '',
            redirect: 0,
        }
    }
    
    componentDidMount() {
        this.fetchDailyMenu();
        this.fetchMyAddress();
        this.fetchReviewAvailable();
        this.fetchDialog();
        //this.fetchCheckUpdate();
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0,
        }).start();
    }

    fetchDailyMenu() {
        fetch(RequestURL.REQUEST_DAILY_MENU)
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
    fetchMyAddress() {
        fetch(RequestURL.REQUEST_MY_ADDRESS + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.length > 0) {
                    this.setState({
                        address: responseData[0].address,
                        addressDetail: responseData[0].address_detail
                    });
                }
            }).catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    fetchReviewAvailable() {
        fetch(RequestURL.REQUEST_REVIEW_AVAILABLE + 'user_idx=' + userIdx)
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.available == 'true') {
                    Actions.WriteReviewPage({ orderIdx: responseData.order_idx })
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
                    this.setState({
                        isDialogVisible: responseData.usedCoupon,
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
        fetch(RequestURL.REQUEST_APP_UPDATE_AVAILABLE)
            .then((response) => response.json())
            .then((responseData) => {
                let available = responseData.available;
                if(available) {
                    console.log('업데이트 처리 해야대요!');
                }
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -HEIGHT,
        }).start();
    }
    render() {
        const { dispatch, cart } = this.props;
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
                                    <TouchableHighlight onPress={ () => this.closeModal() }>
                                        <Text>오늘 그만 보기</Text>                                        
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={ () => this.closeModal() }>
                                        <Text>오늘 그만 보기</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Animated.View>;
        }

        return (
            <View style={styles.container}>
                <PageComment text='모든 메뉴는 당일 조리, 당일 배송 됩니다(5:30pm~10:00pm)' />
                <View style={styles.content}>
                    <ScrollView>
                        <Banner />
                        <DailyMenuList styles={styles.menuList}
                            menus={this.state.menus}
                            addItemToCart={ (menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable) => dispatch(addItemToCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng, enable)) }
                            cart={cart}
                        />
                    </ScrollView>
                    <AddressBar address={this.state.address} addressDetail={this.state.addressDetail}/>
                </View>
                {dialogView}
            </View>
            
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Const.MARGIN_TOP,
        justifyContent: 'center',
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
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
    },
    menuList: {
        flex: 1,
    },
    img: {
        marginLeft: 10,
        width: 20,
        height: 20,
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
        width: 250,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.PRIMARY_GRAY
    },
    dialogImage: {
        width: 250,
        height: 220,
        resizeMode: 'contain',
    },
    closeBox: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
