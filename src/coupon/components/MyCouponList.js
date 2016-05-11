import React, { View, ListView, Text, StyleSheet, Image, TouchableHighlight, Alert, PixelRatio } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Color from '../../const/Color';
import { normalize } from '../../const/Font';
import Const from '../../const/Const';
import MediaURL from '../../const/MediaURL';
import RequestURL from '../../const/RequestURL';
import Mixpanel from '../../util/mixpanel';
import userInfo from '../../util/userInfo';

const couponImageHeight = 0;
if(PixelRatio.get() === 2) {
    couponImageHeight = 150;
} else if(PixelRatio.get() === 3) {
    couponImageHeight = 175;
}
export default class MyCouponList extends React.Component {
    constructor(props) {
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource: dataSource.cloneWithRows(props.coupons)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.coupons !== this.props.coupons) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.coupons)
            })
        }
    }
    fetchCouponAvailble(idx) {
        if(this.props.disable) {
            Mixpanel.trackWithProperties('Choose Coupon', { couponIdx: idx });
            let cart = this.props.cart;
            let menuIdxParam = '';
            let menuAmountParam = '';
            for(let menuIdx in cart) {
                menuIdxParam += cart[menuIdx].menuIdx + '|';
                menuAmountParam += cart[menuIdx].amount + '|';
            }
            menuIdxParam = menuIdxParam.substring(0, menuIdxParam.length - 1);
            menuAmountParam = menuAmountParam.substring(0, menuAmountParam.length - 1);
            
            const param = {
                user_idx: userInfo.idx,
                coupon_idx: idx,
                menu_idx: menuIdxParam,
                menu_amount: menuAmountParam,
            };
            fetch(RequestURL.REQUEST_COUPON_AVAILABLE, {
                method: 'POST',
                headers: {
                    'Accept': 'applcation/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(param)
            })
            .then((response) => response.json())
            .then((responseData) => {
                let available = responseData.available;
                let couponIdx = responseData.coupon_idx;
                let discountCouponPrice = responseData.sale_price;
                let message = responseData.msg;
                
                if(available) {
                    Alert.alert(
                        '쿠폰 사용',
                        message,
                        [
                            {
                              text: '확인',
                              onPress: () => {
                                this.props.fetchCartInfo(couponIdx);
                                this.props.onUseCoupon(couponIdx, discountCouponPrice);
                                Actions.pop();
                              },
                            },
                        ]
                    );
                } else {
                    Alert.alert(
                        '쿠폰 사용 불가',
                        message,
                        [
                            {text: '확인', onPress: () => Actions.pop()},
                        ]
                    );
                }
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
            }
    }
    renderRow(rowData) {
        let imageURL = MediaURL.COUPON_URL + rowData.image_url_coupon;

        return (
            <TouchableHighlight underlayColor={'transparent'}
                onPress={() => this.fetchCouponAvailble(rowData.idx)}
            >
                <View style={styles.row} >
                    <Image style={styles.img}
                        source={{uri: imageURL}} />
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        marginBottom: 10,
    },
    img: {
        width: Const.WIDTH,
        height: normalize(175),
        resizeMode: 'contain',
    }
});
