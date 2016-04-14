'use strict';
import React, { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Color from '../const/Color';
import Const from '../const/Const';
import Font from '../const/Font';
import OrderedMenu from './components/OrderedMenu';
import RequestURL from '../const/RequestURL';

export default class OrderDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            menus: [],
        }
    }
    componentDidMount() {
        this.fetchMyOrderDetail();
    }
    fetchMyOrderDetail() {
        fetch(RequestURL.REQUEST_MY_ORDER_DETAIL + 'order_idx=' + this.props.orderIdx)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    order: responseData,
                    menus: responseData.order_detail,
                });
            })
            .catch((error)=> {
                console.warn(error);
            })
            .done();
    }
    onWriteReview(reviewIsAvailable, orderIdx) {
        if(reviewIsAvailable) 
            Actions.WriteReviewPage({ orderIdx: orderIdx })
    }
    render() {
        const order = this.state.order;
        const menus = this.state.menus;
        const orderIdx = order.order_idx;
        let orderedMenuList = [];
        let reviewButtonText;
        let reviewButtonSubText;
        let reviewButtonStyle;
        menus.forEach(menu => {
            let menuName = menu.name_menu;
            let menuNameKor = menuName.split('.')[0];
            let menuNameEng = menuName.split('.')[1];
            orderedMenuList.push(<OrderedMenu key={menu.idx} name={menuNameKor} foreignName={menuNameEng} amount={menu.amount} />);
        })

        const reviewIsAvailable = !order.review_status;
        if(reviewIsAvailable) {
            reviewButtonText = '리뷰를 남겨주세요 :)';
            reviewButtonSubText = '추첨을 통해 무료 시식권을 드립니다 :) ';
            reviewButtonStyle = { backgroundColor: Color.PRIMARY_ORANGE, borderColor: Color.PRIMARY_ORANGE }
        } else {
            reviewButtonText = '리뷰를 남겨주셔서 감사합니다.';
            reviewButtonSubText = '앞으로도 더욱 좋은 음식으로 보답하겠습니다.';
            reviewButtonStyle = { backgroundColor: Color.PRIMARY_GRAY, borderColor: Color.PRIMARY_GRAY }
        }
        return (
            <View style={styles.container}>
                <View style={styles.content} >
                    <View style={styles.statusBox}>
                        <Text style={[Font.DEFAULT_FONT_BLACK, styles.textFont20]}>{order.description}</Text>
                    </View>
                    {orderedMenuList}
                    <View style={styles.orderInfoBox}>
                        <View style={styles.orderInfoRow}>
                            <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>합계</Text>
                            <Text style={[styles.rightText, Font.DEFAULT_FONT_BLACK]}>{order.total_price}</Text>
                        </View>
                        <View style={styles.orderInfoRow}>
                            <Text style={Font.DEFAULT_FONT_BLACK_BOLD}>배달 시간</Text>
                            <Text style={[styles.rightText, Font.DEFAULT_FONT_BLACK]}>{order.time_slot}</Text>
                        </View>
                    </View>
                    <TouchableHighlight
                        onPress={ () =>  this.onWriteReview(reviewIsAvailable, orderIdx)}
                        underlayColor={'transparent'} >
                        <View style={[styles.reviewBox, reviewButtonStyle]}>
                            <Image style={styles.imageStar}
                                source={require('../commonComponent/img/icon_star_filled_yellow.png')}/>
                            <View style={styles.reviewTextBox} >
                                <Text style={Font.DEFAULT_FONT_WHITE}>{reviewButtonText}</Text>
                                <Text style={Font.DEFAULT_FONT_WHITE}>{reviewButtonSubText}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PRIMARY_BACKGROUND,
        marginTop: Const.MARGIN_TOP,
    },
    content: {
        flex: 1,
        marginTop: 10,
    },
    statusBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
    },
    orderInfoBox: {
        backgroundColor: 'white',
        marginTop: 1,
    },
    orderInfoRow: {
        flexDirection: 'row',
        margin: 10,
    },
    rightText: {
        flex: 1,
        textAlign: 'right',
    },
    reviewBox: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    imageStar: {
        width: 50 * Const.DEVICE_RATIO,
        height: 50 * Const.DEVICE_RATIO,
    },
    reviewTextBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textFont20: {
        fontSize: 20 * Const.DEVICE_RATIO,
    },
});
