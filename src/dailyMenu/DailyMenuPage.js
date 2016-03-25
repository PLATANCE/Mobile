'use strict';
import React, { View, ListView, Text, StyleSheet, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DailyMenuList from './components/DailyMenuList';
import AddressBar from './components/AddressBar';
import Banner from './components/Banner';
import PageComment from '../commonComponent/PageComment';
import Color from '../const/Color';
import Const from '../const/Const';
import RequestURL from '../const/RequestURL';

import { addItemToCart } from '../app/actions/CartActions';
import userInfo from '../util/userInfo';
const userIdx = userInfo.idx;

export default class DailyMenuPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            address: '',
            addressDetail: '',
        }
    }
    
    componentDidMount() {
        this.fetchDailyMenu();
        this.fetchMyAddress();
        this.fetchReviewAvailable();
        //this.fetchCheckUpdate();
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
                this.setState({
                    address: responseData[0].address,
                    addressDetail: responseData[0].address_detail
                });
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
    render() {
        const { dispatch, cart } = this.props;
        return (
            <View style={styles.container}>
                <PageComment text='모든 메뉴는 당일 조리, 당일 배송 됩니다(5:30pm~10:00pm)' />
                <View style={styles.content}>
                    <ScrollView>
                        <Banner />
                        <DailyMenuList styles={styles.menuList}
                            menus={this.state.menus}
                            addItemToCart={ (menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng) => dispatch(addItemToCart(menuDIdx, menuIdx, price, altPrice, imageUrlMenu, menuNameKor, menuNameEng)) }
                            cart={cart}
                        />
                    </ScrollView>
                    <AddressBar address={this.state.address} addressDetail={this.state.addressDetail}/>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Const.MARGIN_TOP,
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
});
